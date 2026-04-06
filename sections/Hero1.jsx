/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Hero1 = () => {
  const [ImageOpen, setImageOpen] = useState(false);
  useEffect(() => {
    setImageOpen(false);
  }, []);

  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex justify-center items-center flex-col relative py-8 z-10">
          <motion.h2 variants={textVariant(1.2)} className={styles.heroHeading}>
            Poster
          </motion.h2>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          >
            <h1 className={styles.heroHeading}>Presentations</h1>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="relative w-full md:-mt-[20px] -mt-[12px]"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[150px] z-[0] -top-[0px] hidden sm:block" />

          <img
            src="/poster_poster.png"
            alt="hero_cover"
            className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
          />
          <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
            <img
              src="/stamp0.png"
              alt="stamp"
              className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain cursor-pointer"
              onClick={() => setImageOpen(true)}
            />
            <Modal
              open={ImageOpen}
              // onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <ModalDialog layout="center" size="md" variant="soft">
                <ModalClose onClick={() => setImageOpen(false)} />
                <div className="overflow-x-hidden overflow-y-auto ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                  <ModalClose onClick={() => setImageOpen(false)} />
                  <Typography className="imagecss font-extrabold text-[16px] leading-[20.16px] text-black uppercase">
                    Poster Presentation
                  </Typography>
                  <Typography>
                    <img
                      src="/poster_poster.png"
                      alt="headset"
                      className="imagecss"
                    />
                  </Typography>
                </div>
              </ModalDialog>
            </Modal>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero1;
