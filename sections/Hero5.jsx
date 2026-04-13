/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { TitleText } from '@/components';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';

const Hero4 = () => (
  <section className={`${styles.yPaddings}`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col will-change-transform will-change-opacity`}
    >
      <div className="flex justify-center self-start items-start flex-col relative py-8 z-10">
        <TitleText title="Non-Technical Events" textStyles="text-center text-[40px] press-start-font bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text gradient-move "/>
        
      </div>

      
    </motion.div>
  </section>
);

export default Hero4;
