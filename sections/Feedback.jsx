"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const Feedback = () => (
  <section className={`${styles.paddings} bg-transparent`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      /*className={`${styles.innerWidth} mx-auto flex flex-col lg:flex-row items-center gap-6 border-[1px] border-[#6A6A6A] rounded-[32px] p-6`}*/
      className={`${styles.innerWidth} mx-auto flex flex-col lg:flex-row items-center gap-6 hod-card rounded-[32px] p-6`}
    >
      <motion.img
        variants={fadeIn("left", "tween", 0.2, 1)}
        src="/hod.jpg"
        alt="HOD"
        /*className="w-[150px] h-[150px] object-cover rounded-full border-4 border-white shadow-lg"*/
        className="w-[150px] h-[150px] object-cover rounded-full border-4 border-[#008080] hod-image"
      />

      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-1 text-center lg:text-left"
      >
        {/*<h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">*/}
        <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-[#F5F5F5]">
          Dr. E. Sreenivasa Rao
        </h4>
        {/*<p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">*/}
        <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-[#949597]">
          ECE | HOD
        </p>
        {/*<p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">*/}
        <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-[#F5F5F5]">
          “Striving for excellence in teaching, training and research in the
          areas of Electronics and Communication Engineering and fostering
          ethical values.”
        </p>
      </motion.div>
    </motion.div>
  </section>
);

export default Feedback;
