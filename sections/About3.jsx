/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Project Expo" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Get ready for an explosive showcase of innovation and creativity at the <span className="font-extrabold text-white">Acumen's </span><span className="italic text-white">Project Expo</span>. We're thrilled to announce the official launch of this exciting event that celebrates the most groundbreaking projects from students across the campus. From cutting-edge tech to revolutionary social initiatives, the <span className="italic text-white">Project Expo</span> promises to be a one-of-a-kind experience that showcases the brightest minds and boldest ideas. With interactive displays, live demonstrations, and engaging presentations, you'll get a chance to witness the future being built right in front of your eyes. So mark your calendars, gather your friends and family, and get ready for a thrilling day of discovery and inspiration. The <span className="italic text-white">Project Expo</span> is not to be missed!
      </motion.p>

      
    </motion.div>
  </section>
);

export default About;
