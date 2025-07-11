import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import express from "express";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for videos
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /^(image|video)\//.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware setup
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Traditional login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // For demo purposes, accept any email/password combination
      // In production, you would validate against a database
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set up session
      (req as any).session.user = user;
      
      res.json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Traditional signup endpoint
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Create new user
      const newUser = await storage.upsertUser({
        id: Date.now().toString(), // Simple ID generation for demo
        email,
        firstName,
        lastName,
        profileImageUrl: null,
      });

      // Set up session
      (req as any).session.user = newUser;
      
      res.json({ message: "Account created successfully", user: newUser });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Account creation failed" });
    }
  });

  // Traditional logout endpoint
  app.post('/api/auth/logout', (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notification to hello@perfectpixelai.com
      const emailSubject = `New Contact Form Submission from ${contactData.name}`;
      const emailBody = `
        New contact form submission:
        
        Name: ${contactData.name}
        Email: ${contactData.email}
        Phone: ${contactData.phone || 'Not provided'}
        
        Message:
        ${contactData.message}
        
        Submitted at: ${new Date().toLocaleString()}
      `;
      
      // In a production environment, you would integrate with an email service
      // For now, we'll log the email content and store it in the database
      console.log('Email would be sent to hello@perfectpixelai.com:');
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);
      
      res.json({ 
        success: true, 
        contact,
        message: "Thank you for your message! We'll get back to you within 24 hours."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Sorry, there was an error sending your message. Please try again." 
        });
      }
    }
  });

  // Admin: Get all contacts
  app.get("/api/contacts", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Blog routes
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const published = req.query.published === 'false' ? false : true;
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin: Blog management
  app.post("/api/admin/blog/posts", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const postData = {
        ...req.body,
        authorId: null,
        slug: req.body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      };
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blog/posts/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.updateBlogPost(id, req.body);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/posts/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio/items", async (req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  // Admin: Portfolio management
  app.post("/api/admin/portfolio/items", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const item = await storage.createPortfolioItem(req.body);
      res.json(item);
    } catch (error) {
      console.error("Error creating portfolio item:", error);
      res.status(500).json({ message: "Failed to create portfolio item" });
    }
  });

  app.put("/api/admin/portfolio/items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.updatePortfolioItem(id, req.body);
      res.json(item);
    } catch (error) {
      console.error("Error updating portfolio item:", error);
      res.status(500).json({ message: "Failed to update portfolio item" });
    }
  });

  app.delete("/api/admin/portfolio/items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePortfolioItem(id);
      res.json({ message: "Portfolio item deleted successfully" });
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      res.status(500).json({ message: "Failed to delete portfolio item" });
    }
  });

  // File upload endpoint (images and videos)
  app.post("/api/admin/upload", isAuthenticated, upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
        uploadedBy: req.user.claims.sub,
      };

      const uploadRecord = await storage.createUpload(uploadData);
      res.json({ 
        ...uploadRecord,
        url: uploadRecord.url // Ensure URL is returned for frontend
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  // Enhanced Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { serviceType, basePrice, addons, hostingType, totalAmount, customerInfo } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          serviceType,
          addons: JSON.stringify(addons),
          hostingType,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
        },
      });

      // Create order record
      const orderData = {
        email: customerInfo.email,
        serviceType,
        basePrice: basePrice.toString(),
        addons: JSON.stringify(addons.map((id: string) => {
          const addonMap: Record<string, any> = {
            'ecommerce': { id, name: 'E-commerce Integration', price: 200 },
            'cms': { id, name: 'Content Management System', price: 150 },
            'seo_premium': { id, name: 'Premium SEO Package', price: 100 },
            'analytics': { id, name: 'Advanced Analytics Setup', price: 75 },
            'social_media': { id, name: 'Social Media Integration', price: 50 },
            'booking': { id, name: 'Online Booking System', price: 125 },
          };
          return addonMap[id] || { id, name: 'Unknown Add-on', price: 0 };
        })),
        hostingType,
        totalAmount: totalAmount.toString(),
        stripePaymentIntentId: paymentIntent.id,
        projectDetails: customerInfo.projectDetails || '',
        status: 'pending',
        progress: 0,
        progressStage: 'planning',
      };

      const order = await storage.createOrder(orderData);

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        orderId: order.id,
        amount: totalAmount 
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Admin: Orders management
  app.get("/api/admin/orders", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.put("/api/admin/orders/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.updateOrder(id, req.body);
      res.json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  // Client portal routes - Get order by payment intent ID (public access for customers)
  app.get("/api/order/:paymentIntentId", async (req, res) => {
    try {
      const { paymentIntentId } = req.params;
      const orders = await storage.getOrders();
      const order = orders.find(o => o.stripePaymentIntentId === paymentIntentId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Return limited order information for client portal
      const clientOrder = {
        id: order.id,
        serviceType: order.serviceType,
        status: order.status,
        progress: order.progress || 0,
        progressStage: order.progressStage || 'planning',
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        addons: order.addons,
        hostingType: order.hostingType,
        projectDetails: order.projectDetails,
        clientNotes: order.clientNotes
      };
      
      res.json(clientOrder);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Update client notes (accessible by payment intent ID)
  app.put("/api/order/:paymentIntentId/notes", async (req, res) => {
    try {
      const { paymentIntentId } = req.params;
      const { clientNotes } = req.body;
      
      const orders = await storage.getOrders();
      const order = orders.find(o => o.stripePaymentIntentId === paymentIntentId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const updatedOrder = await storage.updateOrder(order.id, { clientNotes });
      res.json({ message: "Notes updated successfully", order: updatedOrder });
    } catch (error) {
      console.error("Error updating client notes:", error);
      res.status(500).json({ message: "Failed to update notes" });
    }
  });

  // Webhook for Stripe payment completion
  app.post("/api/stripe/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    if (!sig) {
      return res.status(400).send('Missing Stripe signature');
    }

    try {
      // Note: In production, you should use the webhook endpoint secret
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test');

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        
        // Update order status to paid
        const orders = await storage.getOrders();
        const order = orders.find(o => o.stripePaymentIntentId === paymentIntent.id);
        
        if (order) {
          await storage.updateOrder(order.id, {
            status: 'paid',
            progressStage: 'design',
            progress: 10
          });
        }
      }

      res.json({ received: true });
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      res.status(400).send(`Webhook Error: ${err}`);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
