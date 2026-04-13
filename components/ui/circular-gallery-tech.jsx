import React, { useState, useEffect, useRef } from 'react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
}

const CircularGalleryTech = React.forwardRef(
  ({ items, className, radius = 450, autoRotateSpeed = 0.012, onItemClick, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0, rotation: 0 });
    const isDraggingRef = useRef(false);

    // Handle wheel events only in this section with preventDefault
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e) => {
        // Check if mouse is over gallery
        const rect = container.getBoundingClientRect();
        const isOverGallery = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;

        if (isOverGallery) {
          e.preventDefault();
          const deltaY = e.deltaY > 0 ? 5 : -5;
          setRotation(prev => prev + deltaY);
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    // Handle mouse/touch drag for rotation
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX || e.touches?.[0]?.clientX || 0,
        y: e.clientY || e.touches?.[0]?.clientY || 0,
        rotation: rotation,
      };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
      const diffX = currentX - dragStartRef.current.x;
      
      // Convert pixel drag to rotation (1px = 1 degree)
      setRotation(dragStartRef.current.rotation + diffX * 0.5);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Auto-rotate effect
    useEffect(() => {
      const autoRotate = () => {
        if (!isDraggingRef.current) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={(e) => {
          containerRef.current = e;
          if (typeof ref === 'function') ref(e);
          else if (ref) ref.current = e;
        }}
        role="region"
        aria-label="Tech Events 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none", className)}
        style={{ perspective: '1200px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        {...props}
      >
        <div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : 'transform 0.05s ease-out'
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.35, 1 - (normalizedAngle / 180));
            const scale = Math.max(0.55, 1 - (normalizedAngle / 180) * 0.45);
            const isNearCenter = normalizedAngle < 30;

            return (
              <div
                key={item.id} 
                role="group"
                aria-label={item.title}
                className="absolute w-[176px] h-[224px] sm:w-[208px] sm:h-[256px] md:w-[240px] md:h-[304px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-88px',
                  marginTop: '-112px',
                  opacity: opacity,
                  transition: 'opacity 0.3s ease-out',
                  pointerEvents: isNearCenter ? 'auto' : 'none'
                }}
              >
                <button
                  onClick={() => isNearCenter && onItemClick?.(item, i)}
                  className="relative w-full h-full rounded-lg shadow-xl overflow-hidden group border border-[#00ffaa]/50 bg-slate-900/60 backdrop-blur-md hover:border-[#00ffaa] transition-all duration-300 active:scale-95 cursor-pointer"
                  style={{
                    transform: `scale(${scale})`,
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)'
                  }}
                  disabled={!isNearCenter}
                >
                  {/* Background Image - Clean, No Text Overlay */}
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Subtle Gradient Overlay - Minimal */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 group-hover:to-black/20 transition-all duration-300" />

                  {/* Hover Indicator - Only Near Center */}
                  {isNearCenter && (
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#00ffaa] text-lg">
                      ↓
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[#00ffaa]/60 text-xs sm:text-sm font-semibold pointer-events-none z-20 animate-pulse">
          <span className="block text-center">🖱️ Scroll or Drag to Rotate</span>
        </div>
      </div>
    );
  }
);

CircularGalleryTech.displayName = 'CircularGalleryTech';

export { CircularGalleryTech };
