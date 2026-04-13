'use client';

import React from 'react';
import { motion } from 'framer-motion';
import InteractiveImageBentoGallery from '@/components/ui/bento-gallery';
import { galleryMediaItems } from '@/constants/gallery-data';

const Gallery = () => {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full"
      >
        <InteractiveImageBentoGallery
          imageItems={galleryMediaItems}
          title="Event Gallery"
          description="Explore our collection of captured moments and highlights from Acumen events"
        />
      </motion.div>
    </section>
  );
};

export default Gallery;
