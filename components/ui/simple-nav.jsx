'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Home, Zap, ImageGallery, Users, Award, Mail } from 'lucide-react';

// Map icon IDs to lucide-react components
const iconMap = {
  home: <Home className="w-6 h-6" />,
  events: <Zap className="w-6 h-6" />,
  gallery: <ImageGallery className="w-6 h-6" />,
  team: <Users className="w-6 h-6" />,
  sponsors: <Award className="w-6 h-6" />,
  contact: <Mail className="w-6 h-6" />,
};

// Simple navigation component
export const SimpleNav = ({ items = [], onTabChange, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef([]);
  const limelightRef = useRef(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index, itemOnClick) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-lg bg-slate-900/80 text-white border border-slate-700/50 px-2 backdrop-blur-md ${className}`}>
      {items.map(({ id, label, onClick }, index) => (
          <a
            key={id}
            ref={el => (navItemRefs.current[index] = el)}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 transition-all`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
            title={label}
          >
            <span className={`transition-opacity duration-100 ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            }`}>
              {iconMap[id] || <span>{label.charAt(0)}</span>}
            </span>
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_50px_25px_rgba(34,211,238,0.6)] ${
          isReady ? 'transition-[left] duration-400 ease-in-out' : ''
        }`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[3px] w-[160%] h-12 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-cyan-400/25 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

export default SimpleNav;
