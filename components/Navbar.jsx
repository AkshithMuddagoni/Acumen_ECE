/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import styles from '../styles';
import { navVariants } from '../utils/motion';

// Icon symbols (text-based, no external dependency)
const iconSymbols = {
  home: '🏠',
  events: '⚡',
  gallery: '🖼️',
  team: '👥',
  sponsors: '🏆',
  contact: '✉️',
};

// Inline SimpleNav component
const SimpleNav = ({ items = [], onTabChange, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef([]);
  const limelightRef = useRef(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index, itemOnClick) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-lg bg-slate-900/80 text-white border border-slate-700/50 px-2 backdrop-blur-md ${className}`}>
      {items.map(({ id, label, onClick }, index) => (
          <a
            key={id}
            ref={el => (navItemRefs.current[index] = el)}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 transition-all text-lg`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
            title={label}
          >
            <span className={`transition-opacity duration-100 ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            }`}>
              {iconSymbols[id] || label.charAt(0)}
            </span>
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_50px_25px_rgba(34,211,238,0.6)] ${
          isReady ? 'transition-[left] duration-400 ease-in-out' : ''
        }`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[3px] w-[160%] h-12 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-cyan-400/25 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

// Main Navbar component
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigation = (section, idx) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', onClick: () => handleNavigation('home', 0) },
    { id: 'events', label: 'Events', onClick: () => handleNavigation('events', 1) },
    { id: 'gallery', label: 'Gallery', onClick: () => handleNavigation('gallery', 2) },
    { id: 'team', label: 'Team', onClick: () => handleNavigation('team', 3) },
    { id: 'sponsors', label: 'Sponsors', onClick: () => handleNavigation('sponsors', 4) },
    { id: 'contact', label: 'Contact', onClick: () => handleNavigation('contact', 5) },
  ];

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-4 relative font-key-ui`}
      >
        <div className={`${styles.flexCenter} mx-auto flex gap-4`} style={{"marginTop": "-40px"}}>
            <img 
              src='/logo_vce.png'
              alt='clglogo'
              className='w-[68px] h-[68px] object-contain'
            />
            <h2 className="font-extrabold text-[29px] lg:text-[29px] md:text-[21px] sm:text-[12px] leading-[25px] text-white sm:my-2 lg:my-5">
               VASAVI COLLEGE OF ENGINEERING
            </h2>
        </div>
      </motion.nav>

      {/* Acumen Navigation Bar */}
      {isMounted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/50"
        >
          <div className="flex justify-center items-center py-6">
            <SimpleNav 
              items={navItems}
              onTabChange={() => {}}
              className="bg-slate-900/80"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;