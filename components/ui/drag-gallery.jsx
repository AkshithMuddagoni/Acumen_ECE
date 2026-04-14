'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function DragGallery({
  images,
  className,
  batchSize = 30,
}) {
  const [batchOffset, setBatchOffset] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Generate a new random offset on component mount
  useEffect(() => {
    const maxOffset = Math.max(0, images.length - batchSize);
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));
    setBatchOffset(randomOffset);
    setLoadedImages(new Set());
  }, [images.length, batchSize]);

  // Get current batch of images
  const displayedImages = useMemo(() => {
    const startIdx = batchOffset;
    return images.slice(startIdx, startIdx + batchSize);
  }, [images, batchOffset, batchSize]);

  const handleImageLoad = (idx) => {
    setLoadedImages(prev => new Set(prev).add(idx));
  };

  if (displayedImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-[#d0d0e0]">
        No images available
      </div>
    );
  }

  return (
    <div className="w-full bg-[#141414] pb-12 will-change-scroll">
      <div 
        className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onWheel={(e) => {
          e.currentTarget.scrollLeft += e.deltaY * 1.5;
        }}
      >
        <div className="flex gap-4 px-4 py-6 min-w-min">
          {displayedImages.map((image, idx) => (
            <div
              key={`${batchOffset}-${idx}`}
              className="flex-shrink-0 relative rounded-lg overflow-hidden w-40 h-56 sm:w-52 sm:h-72 md:w-64 md:h-80 bg-[#0f0f25] border border-[#00ffaa]/10"
            >
              {/* Loading skeleton */}
              {!loadedImages.has(idx) && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f25] via-[#1a1a3d] to-[#0f0f25] animate-pulse z-10" />
              )}
              
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt || `Gallery image ${idx}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(idx)}
                  style={{
                    opacity: loadedImages.has(idx) ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              ) : (
                <div className="w-full h-full bg-[#1a1a3d] flex items-center justify-center text-[#666] text-xs">
                  No image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
