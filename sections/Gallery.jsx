'use client';

import React from 'react';
import { DragGallery } from '@/components/ui/drag-gallery';
import { galleryMediaItems } from '@/constants/gallery-data';
import { TitleText } from '@/components/CustomTexts';
import styles from '../styles';

const Gallery = () => {
  // Convert gallery data to image format
  const galleryImages = galleryMediaItems.map((item) => ({
    src: item.src,
    alt: item.alt || 'Gallery image',
  }));

  return (
    <section className={`${styles.paddings}`} id="gallery-section">
      <div className="w-full mb-12">
        <div className={`${styles.innerWidth} mx-auto flex flex-col`}>
          <TitleText title="Event Gallery" textStyles="text-center text-white text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12" />
          <p className="text-center text-[#d0d0e0] text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto">
            Explore our collection of captured moments and highlights from Acumen events. Scroll and drag to explore more (showing 30 images per refresh)
          </p>
        </div>
      </div>

      <DragGallery
        images={galleryImages}
        batchSize={30}
        className="w-full"
      />
    </section>
  );
};

export default Gallery;
