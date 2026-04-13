/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About1 = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| Acumen Poster" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Welcome to <span className="font-extrabold text-white">Acumen</span>, the ultimate platform for showcasing your technical prowess and creativity! One of the exciting events that we have in store for you is the <span className="italic text-white">Poster Presentation</span>. As an individual event, it challenges you to channel your inner artist and create a visually stunning poster that captures the essence of the assigned topic. With the right combination of images, quotes, and creativity, you will have the opportunity to present your poster to our esteemed panel of judges and compete with other talented participants. Join us at <span className="font-extrabold text-white">Acumen</span> and let your poster speak volumes about your innovative ideas!
      </motion.p>

      
    </motion.div>
  </section>
);

export default About1;
