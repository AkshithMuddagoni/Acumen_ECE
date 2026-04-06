/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Router from "next/router";
import styles from "../styles";
import { fadeIn } from "../utils/motion";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { Typography } from "@mui/material";
import { TitleText2 } from "./CustomTexts";

const ExploreCard = ({
  id,
  imgUrl,
  title,
  subtitle,
  Poster,
  pageUrl,
  index,
  active,
  handleClick,
}) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen width is less than 768px (mobile breakpoint)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAction = () => {
    if (id === "world-1" || id === "world-2" || id === "world-3") {
      setOpen(true);
    } else {
      Router.push(`/${pageUrl}`);
    }
  };

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className={`relative ${
        active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer will-change-transform will-change-opacity`}
      onMouseOver={() => handleClick(id)}
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translate3d(0,0,0)",
      }}
    >
      <img
        src={imgUrl}
        alt="planet-04"
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      {active !== id ? (
        /* <h3 className="font-semibold sm:text-[26px] text-[18px] bg-slate-900 p-2 rounded-xl text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">*/
        <h3 className="font-semibold sm:text-[26px] text-[18px] bg-[#000029] p-2 rounded-xl text-[#F5F5F5] absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
          {title}
        </h3>
      ) : (
        <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] ">
          <div
            /*className={`${styles.flexCenter} h-[60px] rounded-[24px] glassmorphism mb-[16px] bg-sky-500 hover:bg-sky-700`}*/

            className={`${styles.flexCenter} h-[60px] rounded-[24px] glassmorphism mb-[16px] bg-[#008080] hover:bg-[#006666]`}
            onClick={handleAction}
          >
            <p className="object-contain font-normal text-[16px] leading-[20.16px] text-white uppercase">
              More Info
            </p>
          </div>

          {/* <h2 className="mt-[24px] font-semibold sm:text-[32px] bg-slate-900 p-2 rounded-xl text-[24px] text-white">*/}
          <h2 className="mt-[24px] font-semibold sm:text-[32px] bg-[#3A3335] p-2 rounded-xl text-[24px] text-[#F5F5F5]">
            {title}
          </h2>
        </div>
      )}

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalDialog
          layout="center"
          size={isMobile ? "md" : "lg"}
          variant="soft"
          className="bg-transparent shadow-none backdrop-blur-sm rounded-lg w-full max-w-3xl"
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            //backgroundColor: 'black',
            backgroundColor: "#000029",
            boxShadow: "none",
            padding: isMobile ? "16px" : "24px",
            maxWidth: isMobile ? "90%" : "70%",
          }}
        >
          <ModalClose
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white"
          />

          <div className={`p-4 ${isMobile ? "w-full" : "w-1/2"}`}>
            <img
              src={Poster}
              alt="Event Poster"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div
            className={`p-4 text-white text-center flex flex-col justify-center ${isMobile ? "w-full" : "w-1/2"}`}
          >
            <TitleText2 title={title} textStyles="text-[20px] font-bold" />
            <Typography className="italic text-sm mt-2 text-[#949597]">
              {subtitle}
            </Typography>
          </div>
        </ModalDialog>
      </Modal>
    </motion.div>
  );
};

export default ExploreCard;
