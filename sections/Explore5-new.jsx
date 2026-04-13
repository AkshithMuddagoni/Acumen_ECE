'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles';
import { exploreWorlds5 } from '../constants';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '@/components/CustomTexts';
import { CircularGallery } from '@/components/ui/circular-gallery-2';

const Explore5 = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const items = exploreWorlds5.map((event) => ({
      image: event.Poster,
      text: event.title,
    }));
    setGalleryItems(items);
    if (items.length > 0) {
      setCurrentEvent(exploreWorlds5[0]);
    }
  }, []);

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col will-change-transform will-change-opacity`}
      >
        <TitleText title="Non-Technical Events" textStyles="text-center text-white text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12" />

        {/* CIRCULAR GALLERY WITH DESCRIPTION BELOW */}
        <div className="w-full mb-12 sm:mb-16">
          {/* Gallery Container */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-b from-[#1a1a3d] to-[#0f0f25] mb-6 sm:mb-8 border border-[#00ffaa]/20">
            {galleryItems.length > 0 && (
              <CircularGallery
                items={galleryItems}
                bend={2.5}
                borderRadius={0.08}
                scrollEase={0.03}
                scrollSpeed={2}
                className="w-full h-full"
              />
            )}
            {/* Scroll Hint */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-[#00ffaa]/60 text-xs sm:text-sm font-medium pointer-events-none animate-pulse">
              ↔️ Scroll or drag to explore
            </div>
          </div>

          {/* Description Section Below Gallery */}
          {currentEvent && (
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1a1a3d]/80 to-[#0f0f25]/80 border border-[#00ffaa]/20 backdrop-blur"
            >
              {/* Event Title */}
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#00ffaa] mb-3 sm:mb-4">
                {currentEvent.title}
              </h3>

              {/* Event Description - Normal Text */}
              <p className="text-sm sm:text-base lg:text-lg text-[#d0d0e0] leading-relaxed mb-6 font-normal">
                {currentEvent.subtitle}
              </p>

              {/* Register Button with Google Forms Link */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScTDNff49n1LQCitTSIFDPUSABn-FnItnwoSYN8ztqfFeOrbA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#000029] font-bold text-sm sm:text-base hover:shadow-[0_0_20px_rgba(0,255,170,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Register Now
              </a>
            </motion.div>
          )}
        </div>

        {/* Event Cards Grid - NO Register Buttons */}
        <div className="w-full">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00ffaa] mb-6 sm:mb-8">All Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {exploreWorlds5.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-pointer h-full"
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setCurrentEvent(event);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setCurrentEvent(event)}
              >
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-[#1a1a3d] to-[#0f0f25] border border-[#00ffaa]/10 hover:border-[#00ffaa]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,170,0.2)]">
                  
                  {/* Event Poster Image */}
                  <img
                    src={event.Poster}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Title Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3 sm:p-4">
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#00ffaa]">
                      {event.title}
                    </h4>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-[#00ffaa]/20 border border-[#00ffaa]/40 text-[#00ffaa] text-xs px-2 py-1 rounded font-semibold">
                      {hoveredIndex === idx ? 'View' : 'Hover'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#00ffaa]/10 to-[#00cc88]/10 border border-[#00ffaa]/20 text-center"
        >
          <p className="text-xs sm:text-sm md:text-base text-[#b0b0d9]">
            <span className="sm:hidden">👆 Tap event cards above to see details in the gallery section</span>
            <span className="hidden sm:inline">🖱️ Hover on event cards or the carousel to view descriptions and register</span>
            <span className="block mt-2 text-[#00ffaa] font-semibold text-xs sm:text-sm">
              🎉 All events welcome everyone • Register today!
            </span>
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Explore5;
