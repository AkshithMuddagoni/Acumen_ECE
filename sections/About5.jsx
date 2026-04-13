/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About4 = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Technical Events" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Welcome to <span className="font-extrabold text-white">Acumen's</span> <span className="italic text-white">Technical Events</span>, where innovation and creativity meet technical expertise. This event is all about showcasing your skills and knowledge in the latest advancements in technology. With a wide range of individual and team events, you'll get the chance to demonstrate your technical prowess. From coding competitions to hardware demonstrations, problem solving to heated gameplays, experience these <span className="italic text-white">Technical Events</span> with like-minded individuals. Get ready to show the world what you're capable of at <span className="font-extrabold text-white">Acumen's</span> <span className="italic text-white">Technical Events!</span>
      </motion.p>

      
    </motion.div>
  </section>
);

export default About4;
