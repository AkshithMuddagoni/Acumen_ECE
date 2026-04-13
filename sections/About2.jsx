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
      <TypingText title="| About Paper Presentations" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Are you passionate about the latest advancements in technology? Do you want to showcase your research and presentation skills? If so, we have the perfect event for you - the <span className="italic text-white">Paper Presentation</span> competition at <span className="font-extrabold text-white">Acumen.</span> In this individual event, participants will have the opportunity to delve into the latest research in technology by referring to an IEEE research paper on given themes, and prepare a visually engaging and informative PowerPoint presentation to present in front of a panel of expert judges. It's an opportunity to showcase your knowledge and creativity while networking with other like-minded individuals. Join us at <span className="font-extrabold text-white">Acumen</span> and put your skills to the test!
      </motion.p>

     
    </motion.div>
  </section>
);

export default About;
