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
      <TypingText title="| About Robotics Event" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Ladies and gentlemen, it's time to get your gears turning and your circuits sparking because the <span className="font-extrabold text-white">Acumen's</span> <span className="italic text-white">Robotic Events</span> is finally here! This year, we're heating things up to the next level. Whether you're a seasoned pro or a curious beginner, this event is sure to leave you awestruck with its fascinating demonstrations, interactive workshops, and much more.At <span className="font-extrabold text-white">Acumen</span>, we're passionate about innovation and creativity, and we believe that robots are the future of technology. That's why we're proud to present this event as an opportunity for everyone to explore the exciting world of robotics. Get ready to see robots that plays soccer, drones that can fly through tight spaces, and VR in it's full glory. But that's not all! The <span className="font-extrabold text-white">Acumen</span> Robotics Event is not just about watching, it's about doing. We've lined up a range of interactive activities and workshops to give you the chance to get hands-on with robots and learn how to program them. Whether you're a beginner or an experienced enthusiast, there's something for everyone at this event.
      </motion.p>

      
    </motion.div>
  </section>
);

export default About4;
