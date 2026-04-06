/* eslint-disable @next/next/no-img-element */
"use client";

import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import styles from "../styles";
import { staggerContainer } from "../utils/motion";
import { TitleText } from "../components";

const Hero = ({ setOpen }) => {
  return (
    <section
      className={`${styles.yPaddings} h-screen text-center flex flex-col justify-start relative
      bg-transparent bg-cover sm:bg-[url('/Acumen_25.png')]`}
    >
      {/* Background Effects */}
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000029] via-transparent to-[#000029] z-0"></div>

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
            onClick={() => setOpen(true)}
            className="p-[2px] bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px] hover:scale-105 transition"
          >
            <span className="block bg-[#000029] px-6 py-4 text-[#F5F5F5] text-[16px] rounded-[30px]">
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
      <div className="absolute bottom-0 w-full h-96 bg-gradient-to-b from-transparent to-[#000029] z-20"></div>
    </section>
  );
};

export default Hero;
