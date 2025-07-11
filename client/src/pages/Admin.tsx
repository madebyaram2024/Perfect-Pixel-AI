import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  testimonial?: string;
  clientName?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

interface Order {
  id: number;
  email: string;
  serviceType: string;
  totalAmount: string;
  status: string;
  createdAt: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("blog");
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);

  // Blog Posts
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts", false],
  });

  const blogMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingBlogPost) {
        return apiRequest("PUT", `/api/admin/blog/posts/${editingBlogPost.id}`, data);
      } else {
        return apiRequest("POST", "/api/admin/blog/posts", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      setEditingBlogPost(null);
      toast({ title: "Blog post saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save blog post", variant: "destructive" });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/blog/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Blog post deleted successfully" });
    },
  });

  // Portfolio Items
  const { data: portfolioItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio/items"],
  });

  const portfolioMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingPortfolioItem) {
        return apiRequest("PUT", `/api/admin/portfolio/items/${editingPortfolioItem.id}`, data);
      } else {
        return apiRequest("POST", "/api/admin/portfolio/items", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/items"] });
      setEditingPortfolioItem(null);
      toast({ title: "Portfolio item saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save portfolio item", variant: "destructive" });
    },
  });

  const deletePortfolioMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/portfolio/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/items"] });
      toast({ title: "Portfolio item deleted successfully" });
    },
  });

  // Orders
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  // Contacts
  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  // Image Upload
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiRequest("POST", "/api/admin/upload", formData);
      return response.json();
    },
    onSuccess: (data) => {
      const fileType = data.mimeType?.startsWith('video/') ? 'video' : 'image';
      toast({ title: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully` });
      return data;
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({ title: "Failed to upload file", variant: "destructive" });
    },
  });

  const handleBlogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string,
      published: formData.get('published') === 'on',
    };
    blogMutation.mutate(data);
  };

  const handlePortfolioSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      testimonial: formData.get('testimonial') as string,
      clientName: formData.get('clientName') as string,
      liveUrl: formData.get('liveUrl') as string,
      featured: formData.get('featured') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    };
    portfolioMutation.mutate(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadMutation.mutateAsync(file);
      return result.url;
    }
  };

  return (
    <div className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-4">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {editingBlogPost ? "Edit Blog Post" : "Create New Blog Post"}
                  {editingBlogPost && (
                    <Button variant="outline" onClick={() => setEditingBlogPost(null)}>
                      Cancel
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="blog-title">Title</Label>
                    <Input
                      id="blog-title"
                      name="title"
                      defaultValue={editingBlogPost?.title}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Textarea
                      id="blog-excerpt"
                      name="excerpt"
                      defaultValue={editingBlogPost?.excerpt}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-content">Content</Label>
                    <Textarea
                      id="blog-content"
                      name="content"
                      rows={10}
                      defaultValue={editingBlogPost?.content}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-image">Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="blog-image"
                        name="imageUrl"
                        type="url"
                        placeholder="Image URL or upload a file below"
                        defaultValue={editingBlogPost?.imageUrl}
                        className="flex-1"
                      />
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="blog-file-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Image File</span>
                        </div>
                      </Label>
                      <input
                        id="blog-file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const result = await uploadMutation.mutateAsync(file);
                              const imageUrlInput = document.getElementById('blog-image') as HTMLInputElement;
                              if (imageUrlInput) {
                                imageUrlInput.value = result.url;
                              }
                            } catch (error) {
                              console.error('Upload failed:', error);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="blog-published"
                      name="published"
                      defaultChecked={editingBlogPost?.published}
                    />
                    <Label htmlFor="blog-published">Published</Label>
                  </div>
                  <Button type="submit" disabled={blogMutation.isPending}>
                    {blogMutation.isPending ? "Saving..." : "Save Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingBlogPost(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteBlogMutation.mutate(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {editingPortfolioItem ? "Edit Portfolio Item" : "Create New Portfolio Item"}
                  {editingPortfolioItem && (
                    <Button variant="outline" onClick={() => setEditingPortfolioItem(null)}>
                      Cancel
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="portfolio-title">Title</Label>
                    <Input
                      id="portfolio-title"
                      name="title"
                      defaultValue={editingPortfolioItem?.title}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio-description">Description</Label>
                    <Textarea
                      id="portfolio-description"
                      name="description"
                      defaultValue={editingPortfolioItem?.description}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio-image">Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="portfolio-image"
                        name="imageUrl"
                        type="url"
                        placeholder="Image URL or upload a file below"
                        defaultValue={editingPortfolioItem?.imageUrl}
                        className="flex-1"
                        required
                      />
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="portfolio-file-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Image File</span>
                        </div>
                      </Label>
                      <input
                        id="portfolio-file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const result = await uploadMutation.mutateAsync(file);
                              const imageUrlInput = document.getElementById('portfolio-image') as HTMLInputElement;
                              if (imageUrlInput) {
                                imageUrlInput.value = result.url;
                              }
                            } catch (error) {
                              console.error('Upload failed:', error);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="portfolio-testimonial">Testimonial</Label>
                    <Textarea
                      id="portfolio-testimonial"
                      name="testimonial"
                      defaultValue={editingPortfolioItem?.testimonial}
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio-client">Client Name</Label>
                    <Input
                      id="portfolio-client"
                      name="clientName"
                      defaultValue={editingPortfolioItem?.clientName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio-url">Live URL</Label>
                    <Input
                      id="portfolio-url"
                      name="liveUrl"
                      type="url"
                      defaultValue={editingPortfolioItem?.liveUrl}
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio-order">Order</Label>
                    <Input
                      id="portfolio-order"
                      name="order"
                      type="number"
                      defaultValue={editingPortfolioItem?.order}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="portfolio-featured"
                      name="featured"
                      defaultChecked={editingPortfolioItem?.featured}
                    />
                    <Label htmlFor="portfolio-featured">Featured</Label>
                  </div>
                  <Button type="submit" disabled={portfolioMutation.isPending}>
                    {portfolioMutation.isPending ? "Saving..." : "Save Portfolio Item"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {portfolioItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-2">
                          {item.featured && <Badge>Featured</Badge>}
                          <span className="text-xs text-muted-foreground">
                            Order: {item.order}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingPortfolioItem(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deletePortfolioMutation.mutate(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                        <p className="text-sm">
                          Service: {order.serviceType.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-sm">Total: ${order.totalAmount}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            order.status === "paid" ? "default" :
                            order.status === "pending" ? "secondary" : "outline"
                          }
                        >
                          {order.status.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Background Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-video">Current Video URL</Label>
                    <Input
                      id="hero-video"
                      type="url"
                      placeholder="Upload a video file below"
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-video-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-6 py-4 border border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <Upload className="w-5 h-5" />
                        <span>Upload Hero Background Video</span>
                        <span className="text-sm text-muted-foreground">(MP4, WebM, or MOV)</span>
                      </div>
                    </Label>
                    <input
                      id="hero-video-upload"
                      type="file"
                      accept="video/mp4,video/webm,video/mov"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const result = await uploadMutation.mutateAsync(file);
                            const videoInput = document.getElementById('hero-video') as HTMLInputElement;
                            if (videoInput) {
                              videoInput.value = result.url;
                            }
                            toast({ title: "Hero video uploaded successfully!" });
                          } catch (error) {
                            console.error('Video upload failed:', error);
                          }
                        }
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload a background video for the hero section. The video will automatically loop with smooth start/stop animation.
                    Recommended: 1920x1080, under 10MB for best performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Messages sent to hello@perfectpixelai.com
                </p>
              </CardHeader>
            </Card>

            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                            {new Date(contact.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="border-l-2 border-accent/50 pl-4">
                        <p className="text-sm text-foreground whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {contacts.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No contact submissions yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}