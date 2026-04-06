/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import styles from "../styles";
import { staggerContainer } from "../utils/motion";
import { TitleText } from "../components";

const Hero = ({ setOpen: parentSetOpen }) => {
  const [localOpen, setLocalOpen] = useState(false);

  const handleRegisterClick = () => {
    if (parentSetOpen) {
      parentSetOpen(true);
    } else {
      setLocalOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (parentSetOpen) {
      parentSetOpen(false);
    } else {
      setLocalOpen(false);
    }
  };
  return (
    <section
      className={`${styles.yPaddings} h-screen text-center flex flex-col justify-start relative
      bg-transparent bg-cover sm:bg-[url('/Acumen_25.png')]`}
    >
      {/* Background Effects */}
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000029] via-transparent to-[#000029] z-0 pointer-events-none"></div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto p-0 flex flex-col justify-start relative z-10`}
      >
        <div className="flex flex-col items-center mt-10">
          <TitleText
            title="ACUMEN ECE"
            textStyles="text-center text-[70px] lg:text-[90px] font-anta bg-gradient-to-r moving-gradient from-[#008080] via-[#949597] to-[#F5F5F5] text-transparent bg-clip-text"
          />

          <TitleText
            title="09-04-2026"
            textStyles="text-center text-[40px] lg:text-[60px] font-anta bg-gradient-to-r moving-gradient from-[#008080] via-[#949597] to-[#F5F5F5] text-transparent bg-clip-text"
          />
        </div>

        {/* ✅ REGISTER BUTTON (GLOBAL CONTROL) */}
        <div className="flex justify-center mt-6 mb-28">
          <button
            type="button"
            onClick={handleRegisterClick}
            className="p-[2px] bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px] hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <span className="block bg-[#000029] px-6 py-4 text-[#F5F5F5] text-[16px] rounded-[30px] pointer-events-none">
              Register Here
            </span>
          </button>
        </div>

        {/* Mobile Image */}
        <div className="block sm:hidden flex justify-center">
          <img
            src="/Acumen_25.png"
            alt="Event Banner"
            className="h-auto w-auto object-cover"
          />
        </div>
      </motion.div>

      {/* Smooth Bottom Fade - Extended for seamless transition */}
      <div className="absolute bottom-0 w-full h-96 bg-gradient-to-b from-transparent to-[#000029] z-20 pointer-events-none"></div>

      {/* ✅ LOCAL MODAL (when parent doesn't manage state) */}
      {!parentSetOpen && localOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#000029] p-8 rounded-2xl text-center w-[300px] shadow-lg">
            <h2 className="text-white text-xl mb-6">Choose Event Type</h2>

            {/* Technical */}
            <a href="https://forms.gle/YOUR_TECH_FORM" target="_ blank">
              <button className="w-full mb-4 p-3 rounded-lg bg-gradient-to-r from-[#008080] to-[#3A3335] text-white">
                Technical Events
              </button>
            </a>

            {/* Non Technical */}
            <a href="https://forms.gle/YOUR_NONTECH_FORM" target="_ blank">
              <button className="w-full p-3 rounded-lg bg-gradient-to-r from-[#3A3335] to-[#008080] text-white">
                Non-Technical Events
              </button>
            </a>

            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="mt-4 text-gray-400 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
