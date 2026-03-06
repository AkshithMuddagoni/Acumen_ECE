/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  /*<section className={`${styles.paddings}`}>*/
  <section className={`${styles.paddings} bg-[#000029]`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Acumen" textStyles="text-center text-[#008080]" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        /*className="mt-[8px] font-normal sm:text-[12px] text-[10px] text-center text-secondary-white"*/
        className="mt-[8px] font-normal sm:text-[12px] text-[10px] text-center text-[#949597]"
      >
        Are you ready to explore the future of technology? Look no further than <span className="font-extrabold text-white">Acumen!</span> This annual event is a celebration of innovation and creativity, with workshops, lectures, and competitions designed to inspire and educate attendees,
        <span className="font-extrabold text-[#008080]">Acumen</span> is the perfect platform for pushing the boundaries of what's possible in the world of technology.
        Let's{' '}
        <span className="font-extrabold text-[#008080]">explore</span> the wonders
        of the Acumen by scrolling down
      </motion.p>


    </motion.div>
  </section>
);

export default About;
