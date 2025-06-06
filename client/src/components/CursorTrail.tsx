import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `translate3d(0, 0, 0)`,
        }}
      >
        <div className="w-4 h-4 rounded-full bg-accent"></div>
      </div>

      {/* Trailing cursor */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-700 ease-out ${
          isHovering ? 'scale-200 opacity-30' : 'scale-100 opacity-20'
        }`}
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `translate3d(0, 0, 0)`,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-accent/50"></div>
      </div>

      {/* Ripple effect on click */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9997] animate-ping"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
        >
          <div className="w-6 h-6 rounded-full bg-accent/30"></div>
        </div>
      )}
    </>
  );
}