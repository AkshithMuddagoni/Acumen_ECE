/* eslint-disable @next/next/no-img-element */
'use client';

import ParticlesBackground from '../components/ParticlesBackground';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';
import { TitleText, TypingText } from '../components';
import { About } from '.';

const Hero = () => (
  <section 
    /*className={`${styles.yPaddings} h-screen text-center flex flex-col justify-start 
    bg-cover sm:bg-[url('/Acumen_25.png')]`}*/
  className={`${styles.yPaddings} h-screen text-center flex flex-col justify-start relative
  bg-[#000029] bg-cover sm:bg-[url('/Acumen_25.png')]`}

  >
    <ParticlesBackground />
    <div className="absolute inset-0 bg-gradient-to-r from-[#000029] via-transparent to-[#000029] z-0"></div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto p-0 flex flex-col justify-start relative z-10 will-change-transform will-change-opacity`}
    >
      <div className="flex flex-col justify-start items-center z-5 mt-0">
        <div className="flex flex-col justify-start items-center z-5 mt-10 md:mt-0">
          <TitleText 
            title="ACUMEN ECE" 
             /*textStyles="text-center text-[70px] lg:text-[90px] xl:text-[90px] 2xl:text-[90px] font-anta bg-gradient-to-r moving-gradient from-[#ff3bff] via-[#ECBFBF] via-[#5C24FF] to-[#D94FD5] text-transparent bg-clip-text gradient-move"
           />*/
          textStyles="text-center text-[70px] lg:text-[90px] xl:text-[90px] 2xl:text-[90px] font-anta bg-gradient-to-r moving-gradient from-[#008080] via-[#949597] to-[#F5F5F5] text-transparent bg-clip-text gradient-move"
          />

          <TitleText 
            title="09-04-2026" 
            /*textStyles="text-center text-[40px] lg:text-[60px] xl:text-[60px] 2xl:text-[60px] font-anta moving-gradient bg-gradient-to-r from-[#ff3bff] via-[#ECBFBF] via-[#5C24FF] to-[#D94FD5] text-transparent bg-clip-text gradient-move"*/
              textStyles="text-center text-[40px] lg:text-[60px] xl:text-[60px] 2xl:text-[60px] font-anta moving-gradient bg-gradient-to-r from-[#008080] via-[#949597] to-[#F5F5F5] text-transparent bg-clip-text gradient-move"

          />
        </div>
      </div> 
       
      <div className='flex flex-row items-center justify-center mt-2 mb-28 md:flex pr-4'>
        <a
          href="https://events.studenttribe.in/event/67e63e31e5c536d5ced28d72"
          target="_blank"
          rel="noreferrer"
        >
          {/*<button className="p-[2px] align-middle bg-gradient-to-r from-[#ff3bff] to-[#5C24FF] rounded-[32px]">*/}
            <button className="p-[2px] align-middle bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px]">
            {/*<span className="block bg-black px-4 py-4 text-white text-[16px] font-normal rounded-[30px]">*/}
            <span className="block bg-[#000029] px-4 py-4 text-[#F5F5F5] text-[16px] font-normal rounded-[30px]">
              Register Here
            </span>
          </button>
        </a>
      </div>

      {/* Image for mobile devices */}
      <div className="block sm:hidden flex justify-center items-center">
        <img 
          src="/Acumen_25.png" 
          alt="Event Banner" 
          /*className="h-auto w-auto"*/
          className="h-auto w-auto object-cover"
        />
      </div>
    </motion.div>
    {/*<div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#000029]" />*/}
  </section>
);

export default Hero;
