/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TitleText } from '@/components';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';

const Hero4 = () => {
  const videoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay when component mounts
    video.play().catch(err => console.log('Autoplay prevented:', err));

    const handleMetadata = () => {
      setVideoDuration(video.duration);
    };

    video.addEventListener('loadedmetadata', handleMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, []);

  // Intersection Observer to detect when hero is in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{ pointerEvents: isInView ? 'auto' : 'none' }}
    >
      {/* Background Video - Autoplay */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <source src="/techbg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex justify-center items-center flex-col relative py-8">
            <TitleText
              title="Technical Events"
              textStyles="text-center text-[50px] md:text-[65px] lg:text-[75px] font-anta bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text font-bold drop-shadow-lg gradient-move"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero4;
