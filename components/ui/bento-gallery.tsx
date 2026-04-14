'use client';

import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';

type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
};

interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[];
  title: string;
  description: string;
}

const InteractiveImageBentoGallery: React.FC<InteractiveImageBentoGalleryProps> = ({
  imageItems,
  title,
  description,
}) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = useCallback((item: ImageItem) => {
    setSelectedItem(item);
    setIsLoading(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
    setIsLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
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

      {/* Gallery Grid - Ultra Simple, Mobile Optimized */}
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-4">
          {imageItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleImageClick(item)}
              className="aspect-square overflow-hidden rounded-lg bg-gray-900 shadow-sm hover:shadow-md transition-shadow active:scale-95"
              type="button"
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover"
                loading={idx < 8 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal - Simple & Mobile Friendly */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
              </div>
            )}
            
            {/* Image */}
            <img
              src={selectedItem.url}
              alt={selectedItem.title}
              className="h-auto max-h-[85vh] w-full rounded-lg object-contain"
              onLoad={handleImageLoad}
            />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors z-10"
              type="button"
              aria-label="Close"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveImageBentoGallery;
