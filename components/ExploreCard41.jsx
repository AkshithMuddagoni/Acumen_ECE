//ROBOTIC EVENTS
/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { fadeIn } from '../utils/motion';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import { Typography } from '@mui/material';
import { TitleText2 } from './CustomTexts';


const ExploreCard = ({ id, imgUrl, Poster, title, subtitle, index, active, handleClick }) =>{ 
  const [open, setOpen] = useState(false)
  const handleAction = () => {
      setOpen(true); // Open modal
    
  };
  return(
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative ${
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2] will-change-transform will-change-opacity'
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer will-change-transform will-change-opacity`}
    onMouseOver={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {active !== id ? (
      
      <h3
        className="font-semibold sm:text-[26px] text-[18px] text-white bg-black p-2 rounded-xl absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] cursor-pointer hover:bg-sky-700 transition-colors duration-300"
        onClick={(event) => {
          event.stopPropagation();
          handleAction();
        }}
      >
        {title}
      </h3>
      
    ) :(
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] ">
        <button
          type="button"
          className="mt-[24px] font-semibold sm:text-[32px] bg-slate-900 hover:bg-sky-700 p-2 rounded-xl text-[24px] text-white text-left transition-colors duration-300"
          onClick={handleAction}
        >
          {title}
        </button>
      </div>
    )}

    {/* MODAL (Only for world-1 and world-2) */}
    <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
      <ModalDialog
        layout="center"
        size="lg"
        variant="soft"
        className="bg-black shadow-none backdrop-blur-sm flex flex-row items-center p-6 rounded-lg w-full max-w-3xl"
        sx={{
          display: 'flex',
          flexDirection: 'row', // Forces horizontal layout
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black', // Ensures transparency
          boxShadow: 'none', // Removes default shadow
        }}
      >
        <ModalClose onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white" />

        {/* Left Side - Poster Image */}
        <div className="w-1/2 p-4">
          <img src={Poster} alt="Event Poster" className="w-full h-auto rounded-lg shadow-lg" />
        </div>

        {/* Right Side - Event Content */}
        <div className="w-1/2 p-4 text-white text-center flex flex-col justify-center">
          <TitleText2 title={title} textStyles='text-[2px]'></TitleText2>
          <Typography className="italic text-sm mt-2">{subtitle}</Typography>
        </div>
      </ModalDialog>
    </Modal>
  </motion.div>
)};

export default ExploreCard;

