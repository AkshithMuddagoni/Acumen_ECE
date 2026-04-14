'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface GalleryImage {
  src: string;
  alt?: string;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function MasonryGallery({
  images,
  className,
  columns = { sm: 2, md: 2, lg: 3 },
}: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className={cn('relative w-full px-2 sm:px-4 py-8 sm:py-10', className)}>
      <div className={cn(
        'mx-auto grid w-full max-w-6xl gap-3 sm:gap-4',
        'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
      )}>
        {Array.from({ length: 3 }).map((_, col) => (
          <div key={`col-${col}`} className="grid gap-3 sm:gap-4">
            {images
              .filter((_, idx) => idx % 3 === col)
              .map((image, imgIdx) => {
                // Seed random with index for consistent aspect ratios
                const seed = col * 1000 + imgIdx;
                const isPortrait = (seed % 3) === 0;
                const ratio = isPortrait ? 9 / 16 : 16 / 9;

                return (
                  <AnimatedGalleryImage
                    key={`img-${col}-${imgIdx}`}
                    alt={image.alt || `Gallery image ${col}-${imgIdx}`}
                    src={image.src}
                    ratio={ratio}
                  />
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedGalleryImageProps {
  alt: string;
  src: string;
  className?: string;
  ratio: number;
}

function AnimatedGalleryImage({
  alt,
  src,
  ratio,
  className,
}: AnimatedGalleryImageProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    // Fallback: try to use a placeholder if image fails
    setImgSrc(`https://via.placeholder.com/600x600?text=${encodeURIComponent(alt)}`);
  };

  return (
    <AspectRatio
      ref={ref}
      ratio={ratio}
      className="bg-[#0f0f25] relative w-full overflow-hidden rounded-lg border border-[#00ffaa]/20 group hover:border-[#00ffaa] transition-all"
    >
      <img
        alt={alt}
        src={imgSrc}
        className={cn(
          'h-full w-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105',
          {
            'opacity-100': isInView && !isLoading,
          },
          className
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={handleError}
      />

      {/* Loading skeleton bg */}
      {isLoading && isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3d] to-[#0f0f25] animate-pulse" />
      )}
    </AspectRatio>
  );
}
