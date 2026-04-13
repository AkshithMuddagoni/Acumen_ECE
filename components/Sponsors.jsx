'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { TypingText } from '../components';
import { fadeIn, staggerContainer } from '../utils/motion';
import { sponsorsList } from '../constants';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles';

const Sponsors = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only render the slider when windowWidth is defined
  if (!windowWidth) return null;

  // ✅ Improved container size calculation for better responsiveness
  let slidesToShow = 3; // Default for large screens
  //if (windowWidth < 1024) slidesToShow = 3; // Medium screens
  if (windowWidth < 768) slidesToShow = 2; // Tablets
  if (windowWidth < 480) slidesToShow = 1; // Small phones

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
  };
  
  const extendedSponsors = [...sponsorsList, ...sponsorsList];
  const sponsorItems = extendedSponsors.map((sponsor, index) => {
    const handleClick = () => {
      if (sponsor.url) {
        window.open(sponsor.url, '_blank');
      }
    };

    return (
      <div key={index} className="p-4">
        <div
          className={`bg-white flex items-center justify-center rounded-xl mx-auto ${
            sponsor.url ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
          }`}
          onClick={handleClick}
          style={{
            width: "90%", // ✅ Increase size on mobile
            maxWidth: "200px", // ✅ Prevent overly large logos
            height: "120px", // ✅ Increase height for better visibility
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", // ✅ Slight shadow for better appearance
          }}
        >
          <img
            className={sponsor.url ? 'cursor-pointer' : ''}
            src={sponsor.imgUrl}
            alt={sponsor.title}
            style={{
              width: "auto",
              maxWidth: "80%",
              height: "auto",
              maxHeight: "80%",
              margin: "auto",
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText title="| Sponsors" textStyles="text-center" />
      </motion.div>
      <div className="w-full max-w-5xl mx-auto px-4">
        <Slider {...settings}>{sponsorItems}</Slider>
      </div>
    </section>
  );
};

export default Sponsors;
