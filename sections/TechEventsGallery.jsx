'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles';
import { exploreWorlds4 } from '../constants';
import { staggerContainer } from '../utils/motion';
import { TitleText } from '@/components/CustomTexts';
import { CircularGalleryTech } from '@/components/ui/circular-gallery-tech';

const TechEventsGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const galleryItems = exploreWorlds4.map((event) => ({
    id: event.id,
    title: event.title,
    subtitle: event.subtitle,
    poster: event.Poster || event.imgUrl,
    pageUrl: event.pageUrl,
  }));

  const handleEventClick = (item, index) => {
    setSelectedEvent(item);
  };

  const handleRegister = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSeYCluNgFEkYtMb5uVdfotvmqKduGwDhof92pWDRueX-V_Plw/viewform', '_blank');
  };

  return (
    <section className={`${styles.paddings}`} id="tech-events">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col will-change-transform will-change-opacity`}
      >
        <TitleText 
          title="Technical Events" 
          textStyles="text-center text-white text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-16" 
        />

        {/* 3D CIRCULAR GALLERY */}
        <div className="w-full relative">
          {/* Gallery Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a3d] to-[#0f0f25] border-2 border-[#00ffaa]/40 shadow-2xl shadow-[#00ffaa]/30 p-8"
          >
            {galleryItems.length > 0 && (
              <CircularGalleryTech
                items={galleryItems}
                radius={400}
                autoRotateSpeed={0.01}
                onItemClick={handleEventClick}
                className="w-full h-full"
              />
            )}

            {/* Scroll Hint */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-[#00ffaa]/80 text-xs sm:text-sm font-bold pointer-events-none z-20 text-center"
            >
              <span className="block">↔️ Scroll to Rotate • Click to Explore</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#00ffaa]/10 to-[#00cc88]/10 border border-[#00ffaa]/30 text-center"
        >
          <p className="text-sm sm:text-base text-[#b0b0d9] mb-2">
            🚀 Explore cutting-edge technical competitions
          </p>
          <p className="text-xs sm:text-sm text-[#00ffaa] font-semibold">
            Click any event to learn more and discover the challenge that awaits you!
          </p>
        </motion.div>

      </motion.div>

      {/* EVENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a3d] to-[#0f0f25] border-2 border-[#00ffaa]/50 shadow-2xl max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Close */}
              <div className="sticky top-0 flex justify-between items-center p-4 sm:p-6 bg-gradient-to-b from-[#1a1a3d] to-transparent z-10 border-b border-[#00ffaa]/20">
                <h2 className="text-xl sm:text-2xl font-black text-[#00ffaa]">
                  {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-full bg-[#00ffaa]/20 hover:bg-[#00ffaa]/40 border border-[#00ffaa]/40 hover:border-[#00ffaa]/80 transition-all text-[#00ffaa] text-xl hover:scale-110 flex-shrink-0"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-8">
                {/* Event Poster Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="mb-6 sm:mb-8 rounded-xl overflow-hidden h-48 sm:h-64 md:h-80 bg-black/40 border border-[#00ffaa]/20"
                >
                  <img
                    src={selectedEvent.poster}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mb-6 sm:mb-8"
                >
                  <p className="text-sm sm:text-base lg:text-lg text-[#d0d0e0] leading-relaxed font-normal">
                    {selectedEvent.subtitle}
                  </p>
                </motion.div>

                {/* Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mb-8 p-5 sm:p-6 rounded-xl bg-[#0f0f25]/70 border border-[#00ffaa]/25"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-[#00ffaa] mb-4">Event Info</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm sm:text-base text-[#b0b0d9]">
                    <div>
                      <span className="text-[#00ffaa] font-semibold block mb-1">📅 Date</span>
                      <span>April 16, 2026</span>
                    </div>
                    <div>
                      <span className="text-[#00ffaa] font-semibold block mb-1">⏰ Time</span>
                      <span>9:00 AM onwards</span>
                    </div>
                    <div>
                      <span className="text-[#00ffaa] font-semibold block mb-1">📍 Venue</span>
                      <span>ECE Block</span>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <button
                    onClick={handleRegister}
                    className="flex-1 py-3 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#000029] font-black text-base sm:text-lg hover:shadow-[0_0_40px_rgba(0,255,170,0.8)] transition-all transform hover:scale-105 active:scale-95"
                  >
                    Register →
                  </button>
                  <button
                    onClick={() => window.open('https://drive.google.com/drive/folders/12iEAt-7cRzJRDZAR_7x83Ku2ZhQRwTfS', '_blank')}
                    className="flex-1 py-3 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white font-black text-base sm:text-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.8)] transition-all transform hover:scale-105 active:scale-95"
                  >
                    📋 Rule Book
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 py-3 sm:py-4 px-6 rounded-xl border-2 border-[#00ffaa]/50 text-[#00ffaa] font-black text-base sm:text-lg hover:bg-[#00ffaa]/10 transition-all"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechEventsGallery;
