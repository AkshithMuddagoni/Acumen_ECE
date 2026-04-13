'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles';
import { exploreWorlds5 } from '../constants';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '@/components/CustomTexts';
import { CircularGallery } from '@/components/ui/circular-gallery-2';

const Explore5 = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const DRAG_THRESHOLD = 8;

  useEffect(() => {
    const items = exploreWorlds5.map((event) => ({
      image: event.Poster,
      text: event.title,
    }));
    setGalleryItems(items);
    if (exploreWorlds5.length > 0) {
      setCurrentIndex(0);
    }
  }, []);

  const handleMouseDown = (e) => {
    dragStartPos.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0,
    };
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    // This will be triggered during scroll, setting isDragging to true
    setIsDragging(true);
  };

  const handleMouseUp = (e) => {
    const endX = e.clientX || e.changedTouches?.[0]?.clientX || dragStartPos.current.x;
    const endY = e.clientY || e.changedTouches?.[0]?.clientY || dragStartPos.current.y;
    
    const diffX = Math.abs(endX - dragStartPos.current.x);
    const diffY = Math.abs(endY - dragStartPos.current.y);
    
    // If movement is less than threshold, it's a click, not a drag
    if (diffX < DRAG_THRESHOLD && diffY < DRAG_THRESHOLD && exploreWorlds5.length > 0) {
      setSelectedEvent(exploreWorlds5[currentIndex]);
    }
  };

  const handleEventThumbnailClick = (index) => {
    setCurrentIndex(index);
    setSelectedEvent(exploreWorlds5[index]);
  };

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

        {/* CIRCULAR GALLERY */}
        <div className="w-full">
          {/* Gallery Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-80 sm:h-96 md:h-[480px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a3d] to-[#0f0f25] border-2 border-[#00ffaa]/30 shadow-2xl shadow-[#00ffaa]/20 hover:border-[#00ffaa]/50 hover:shadow-[#00ffaa]/30 transition-all duration-300 active:scale-98 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
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
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-[#00ffaa]/70 text-xs sm:text-sm font-bold pointer-events-none animate-pulse z-10">
              <span className="block text-center">↔️ Drag to Scroll • Click to View</span>
            </div>
          </motion.div>

          {/* Event Thumbnail Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-3"
          >
            {exploreWorlds5.map((event, index) => (
              <motion.button
                key={`event-thumb-${index}`}
                onClick={() => handleEventThumbnailClick(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 group cursor-pointer ${
                  currentIndex === index
                    ? 'border-[#00ffaa] shadow-lg shadow-[#00ffaa]/50'
                    : 'border-[#00ffaa]/20 hover:border-[#00ffaa]/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={event.Poster}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 transition-all ${currentIndex === index ? 'bg-[#00ffaa]/30' : 'bg-black/40 group-hover:bg-black/20'}`} />
              </motion.button>
            ))}
          </motion.div>
        </div>

      </motion.div>

      {/* EVENT DETAILS MODAL - COMPACT VERSION */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-lg rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a3d] to-[#0f0f25] border border-[#00ffaa]/40 shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-b from-[#1a1a3d] to-transparent sticky top-0 z-10">
                <h3 className="text-sm sm:text-base font-bold text-[#00ffaa] flex-1">Event Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 sm:p-2 rounded-full bg-[#00ffaa]/20 hover:bg-[#00ffaa]/40 border border-[#00ffaa]/40 hover:border-[#00ffaa]/60 transition-all text-[#00ffaa] text-lg hover:scale-110 flex-shrink-0"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content - Compact */}
              <div className="px-3 sm:px-5 pb-4 sm:pb-6">
                {/* Event Image */}
                <div className="mb-4 rounded-lg overflow-hidden h-40 sm:h-48 bg-black/40">
                  <img
                    src={selectedEvent.Poster}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event Title */}
                <h2 className="text-xl sm:text-2xl font-black text-[#00ffaa] mb-3">
                  {selectedEvent.title}
                </h2>

                {/* Event Description */}
                <p className="text-xs sm:text-sm text-[#d0d0e0] leading-relaxed mb-4 font-normal">
                  {selectedEvent.subtitle}
                </p>

                {/* Quick Details */}
                <div className="mb-4 p-3 rounded-lg bg-[#0f0f25]/50 border border-[#00ffaa]/20">
                  <div className="space-y-2 text-xs sm:text-sm text-[#b0b0d9]">
                    <div className="flex justify-between">
                      <span className="text-[#00ffaa]">📅 Date:</span>
                      <span>April 16, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00ffaa]">📍 Venue:</span>
                      <span>Outside JC Bose Block</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00ffaa]">🎟️ Entry:</span>
                      <span>Free</span>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScTDNff49n1LQCitTSIFDPUSABn-FnItnwoSYN8ztqfFeOrbA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#000029] font-black text-sm sm:text-base hover:shadow-[0_0_30px_rgba(0,255,170,0.8)] transition-all transform hover:scale-105 active:scale-95 text-center"
                >
                  🚀 Register Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Explore5;
