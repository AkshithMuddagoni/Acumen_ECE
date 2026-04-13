'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveImageBentoGallery from '@/components/ui/bento-gallery';
import { getGalleryByYear, AVAILABLE_YEARS } from '@/constants/gallery-data';

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const galleryMediaItems = getGalleryByYear(selectedYear);

  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      {/* Year Selector */}
      <div className="flex justify-center gap-2 md:gap-4 mb-12 px-4 flex-wrap">
        {AVAILABLE_YEARS.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 md:px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedYear === year
                ? 'bg-[#00ffaa] text-black shadow-lg shadow-[#00ffaa]/50'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

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
          description={`Explore our collection of captured moments and highlights from Acumen ${selectedYear}`}
        />
      </motion.div>
    </section>
  );
};

export default Gallery;
