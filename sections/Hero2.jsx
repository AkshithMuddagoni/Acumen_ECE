/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { TitleText } from '@/components';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';

const Hero2 = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col will-change-transform will-change-opacity`}
    >
      <div className="flex justify-center items-center flex-col relative py-8 z-10">
        <TitleText title="Non-Technical Events" textStyles="text-center text-[60px] font-anta bg-gradient-to-r from-[#ff3bff] via-[#ECBFBF] via-[#5C24FF] to-[#D94FD5] text-transparent bg-clip-text gradient-move "/>
      </div>

      
    </motion.div>
  </section>
);

export default Hero2;
