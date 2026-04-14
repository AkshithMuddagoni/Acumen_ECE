'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';

type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
};

interface OptimizedGalleryProps {
  imageItems: ImageItem[];
  title: string;
  description: string;
}

const OptimizedGallery: React.FC<OptimizedGalleryProps> = ({
  imageItems,
  title,
  description,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const selectedItem = useMemo(
    () => (selectedIdx !== null ? imageItems[selectedIdx] : null),
    [selectedIdx, imageItems]
  );

  const handleOpen = useCallback((idx: number) => {
    setSelectedIdx(idx);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  return (
    <section className="relative w-full bg-black py-16 sm:py-24">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-300">
          {description}
        </p>
      </div>

      {/* Gallery Grid - Optimized */}
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-4">
          {imageItems.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => handleOpen(idx)}
              className="aspect-square overflow-hidden rounded-lg bg-gray-900 shadow-sm hover:shadow-lg active:scale-95 transition-all"
              type="button"
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
                loading={idx < 10 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal - Simple & Performant */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-2 sm:p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedItem.url}
              alt={selectedItem.title}
              className="w-full h-full rounded-lg object-contain"
            />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 sm:p-3 transition-colors z-10"
              type="button"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Navigation - Previous */}
            {selectedIdx! > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(selectedIdx! - 1);
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 sm:p-3 transition-colors"
                aria-label="Previous image"
              >
                ←
              </button>
            )}

            {/* Navigation - Next */}
            {selectedIdx! < imageItems.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(selectedIdx! + 1);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 sm:right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 sm:p-3 transition-colors"
                aria-label="Next image"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default OptimizedGallery;
