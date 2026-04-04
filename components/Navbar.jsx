/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-4 relative`}
    /*className={`${styles.xPaddings} py-4 fixed w-full top-0 bg-[#000029]/90 backdrop-blur-md z-20`}*/
  >
    {/* <div className="absolute w-[50%] inset-0 gradient-01" /> */}
    <div className={`${styles.flexCenter} mx-auto flex gap-4`} style={{"marginTop": "-40px"}}>
        <img 
          src='/logo_vce.png'
          alt='clglogo'
          className='w-[80px] h-[80px] object-cover'
          
        />
        <h2 className="font-extrabold text-[29px] lg:text-[29px] md:text-[21px] sm:text-[12px] leading-[25px] text-white sm:my-2 lg:my-5">
           VASAVI COLLEGE OF ENGINEERING
        </h2>
      </div>
      
  </motion.nav>
);

export default Navbar;