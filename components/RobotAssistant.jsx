import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';

const RobotAssistant = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [customMessage, setCustomMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  
  // Easter egg: Tap counter system (low-resource)
  const [tapCount, setTapCount] = useState(0);
  const [moodState, setMoodState] = useState('normal'); // 'normal', 'angry', 'sleepy'
  
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const clickScale = useMotionValue(1);
  const clickGlowOpacity = useMotionValue(0);
  const easterEggScale = useMotionValue(1);
  const easterEggHeat = useMotionValue(0); // 0 to 1 for red heat effect

  const messages = ["Welcome to ACUMEN", "Register Now", "Explore Events"];

  // Head tracks headX / headY natively
  const rotateX = useTransform(headY, [-1, 1], [25, -25]);
  const rotateY = useTransform(headX, [-1, 1], [-30, 30]);
  
  const bodyRotateX = useTransform(rotateX, r => r * 0.2);
  const bodyRotateY = useTransform(rotateY, r => r * 0.2);

  // Eyes track eyeX / eyeY natively
  const eyeMoveX = useTransform(eyeX, [-1, 1], [-12, 12]);
  const eyeMoveY = useTransform(eyeY, [-1, 1], [-12, 12]);

  // Reactive Ears
  const earRotX = useMotionValue(0);
  const earRotZ = useMotionValue(0);
  const leftEarRotZ = useTransform(earRotZ, z => -z);

  // Expressive Eyes (Squint, Widen, Angle)
  const eyeScaleX = useMotionValue(1);
  const eyeScaleY = useMotionValue(1);
  const browPercent = useMotionValue(-120);
  const leftBrowRot = useMotionValue(0);
  const rightBrowRot = useTransform(leftBrowRot, r => -r);
  const dynamicBrowY = useTransform(browPercent, v => `${v}%`);
  
  // Angry Red Flare!
  const angryRedOpacity = useMotionValue(0);
  const angryGlowScale = useMotionValue(1);

  // Easter egg tap handler: increases size and heat when tapped rapidly
  const handleEasterEggTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);
    
    // Clamp max scale to 1.5x and heat to 1.0
    const newScale = Math.min(1 + (newTapCount * 0.1), 1.5);
    const newHeat = Math.min(newTapCount * 0.15, 1);
    
    // Animate scale and heat instantly
    animate(easterEggScale, newScale, { duration: 0.15 });
    animate(easterEggHeat, newHeat, { duration: 0.2 });
  };

  useEffect(() => {
    setIsClient(true);
    
    // Check initial breakpoints
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    let idleTimer;
    let stateTimer;
    let moveTimer;
    let currentState = "normal";
    let stateQueue = [];
    let easterEggResetTimer;

    // Set up reset timer for easter egg
    const setupEasterEggReset = () => {
      clearTimeout(easterEggResetTimer);
      easterEggResetTimer = setTimeout(() => {
        setTapCount(0);
        animate(easterEggScale, 1, { duration: 0.6, type: 'spring', stiffness: 150 });
        animate(easterEggHeat, 0, { duration: 0.8, type: 'spring', stiffness: 100 });
      }, 5000);
    };

    // Call reset setup whenever tap count changes
    if (tapCount > 0) {
      setupEasterEggReset();
    }

    const generateStateQueue = () => {
        // Guaranteed perfect 60-second mathematical loadout
        const queue = [
            { state: 'aggressive', duration: 4000 },
            { state: 'aggressive', duration: 4000 },
            { state: 'aggressive', duration: 4000 },
            { state: 'passive', duration: 4000 },
            { state: 'passive', duration: 8000 },
            { state: 'normal', duration: 6000 },
            { state: 'normal', duration: 6000 },
            { state: 'normal', duration: 8000 },
            { state: 'normal', duration: 8000 },
            { state: 'normal', duration: 8000 }
        ];
        
        // Fisher-Yates Pseudo-Random Shuffle
        for (let i = queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [queue[i], queue[j]] = [queue[j], queue[i]];
        }
        return queue;
    };

    const changeState = () => {
      // Re-fill the 60-second queue linearly if exhausted
      if (stateQueue.length === 0) {
          stateQueue = generateStateQueue();
      }
      
      const currentAction = stateQueue.shift();
      currentState = currentAction.state;
      const cycleLength = currentAction.duration;
      
      if (currentState === "aggressive") {
         // Airplane ears! Flatten backwards in hunting mode
         animate(earRotX, -60, { type: 'spring', stiffness: 300, damping: 15 });
         animate(earRotZ, 0, { type: 'spring', stiffness: 300, damping: 15 });
         
         // Dilated hunting pupils! 
         animate(eyeScaleX, 1.2, { type: 'spring', stiffness: 300, damping: 15 });
         animate(eyeScaleY, 1.2, { type: 'spring', stiffness: 300, damping: 15 });
         
         // Trigger blazing blood red overdrive!
         animate(angryRedOpacity, 1, { duration: 0.2 });
         animate(angryGlowScale, 1.4, { type: 'spring', stiffness: 300, damping: 10 });
         
         // Drop fierce angled eyelids slicing the perfect red 'V' across the top 40% of the socket
         animate(browPercent, -55, { type: 'spring', stiffness: 450, damping: 15 });
         animate(leftBrowRot, 35, { type: 'spring', stiffness: 450, damping: 15 });
         
      } else if (currentState === "normal") {
         // Alert upward ears
         animate(earRotX, 0, { type: 'spring', stiffness: 150, damping: 20 });
         animate(earRotZ, 0, { type: 'spring', stiffness: 150, damping: 20 });
         // Alert Wide Open Normal Eyes
         animate(eyeScaleX, 1, { type: 'spring', stiffness: 150, damping: 20 });
         animate(eyeScaleY, 1, { type: 'spring', stiffness: 150, damping: 20 });
         
         // Retract all angry elements seamlessly
         animate(angryRedOpacity, 0, { duration: 0.4 });
         animate(angryGlowScale, 1, { type: 'spring', stiffness: 150, damping: 20 });
         animate(browPercent, -120, { type: 'spring', stiffness: 150, damping: 20 });
         animate(leftBrowRot, 0, { type: 'spring', stiffness: 150, damping: 20 });
         
      } else {
         // PASSIVE MODE
         // Cuddly droplet ears! Droop deeply sideways
         animate(earRotX, -10, { type: 'spring', stiffness: 50, damping: 20 });
         animate(earRotZ, 40, { type: 'spring', stiffness: 50, damping: 20 });
         // Sleepy Relaxed Horizontal Squints
         animate(eyeScaleX, 1.4, { type: 'spring', stiffness: 100, damping: 20 });
         animate(eyeScaleY, 0.15, { type: 'spring', stiffness: 100, damping: 20 });
         
         // Retract all angry elements seamlessly
         animate(angryRedOpacity, 0, { duration: 0.4 });
         animate(angryGlowScale, 1, { type: 'spring', stiffness: 100, damping: 20 });
         animate(browPercent, -120, { type: 'spring', stiffness: 100, damping: 20 });
         animate(leftBrowRot, 0, { type: 'spring', stiffness: 100, damping: 20 });
      }
      
      stateTimer = setTimeout(changeState, cycleLength);
    };

    const movementEngine = () => {
      let nextMoveDelay = 1000;
      
      if (currentState === "aggressive") {
         // AGGRESSIVE: Non-stop erratic, violent darting and shaking across random points
         const targetLockX = (Math.random() * 2 - 1) * 0.9;
         const targetLockY = (Math.random() * 2 - 1) * 0.9;
         
         // Extremely fast snap physics
         const aggressiveConfig = { type: "spring", stiffness: 800, damping: 10 };
         
         animate(headX, targetLockX + (Math.random() * 0.2 - 0.1), aggressiveConfig);
         animate(headY, targetLockY + (Math.random() * 0.2 - 0.1), aggressiveConfig);
         // Eyes dart wildly tracking tiny movements
         animate(eyeX, targetLockX, aggressiveConfig);
         animate(eyeY, targetLockY, aggressiveConfig);
         
         // Fire next violent movement extremely fast so it literally never stops shaking/darting
         nextMoveDelay = 150 + Math.random() * 150; 

      } else if (currentState === "passive") {
         // PASSIVE: Sluggish, elegant continuous swooping movements across entire screen length.
         const lazyHeadX = (Math.random() * 2 - 1) * 0.95; // Stretches physical tracking to extremes
         const lazyHeadY = (Math.random() * 2 - 1) * 0.95; 
         
         // Fluid, slow physics pushing it fast enough to be undeniably visible but languid
         const lazyConfig = { type: "spring", stiffness: 35, damping: 40 };
         
         animate(headX, lazyHeadX, lazyConfig);
         animate(headY, lazyHeadY, lazyConfig);
         
         // Eyes constantly roll slightly decoupled, aimed towards ceiling
         animate(eyeX, lazyHeadX + (Math.random() * 0.6 - 0.3), lazyConfig);
         animate(eyeY, lazyHeadY - 0.7 - (Math.random() * 0.4), lazyConfig); 
         
         // Provide generous transit window so sweeping physics animations cross the whole screen seamlessly
         nextMoveDelay = 1500 + Math.random() * 1500;

      } else {
         // NORMAL: Constant moderate wandering and looking around
         const curX = (Math.random() * 2 - 1) * 0.7;
         const curY = (Math.random() * 2 - 1) * 0.7;
         const normalConfig = { type: "spring", stiffness: 150, damping: 20 };
         
         animate(headX, curX, normalConfig);
         animate(headY, curY, normalConfig);
         animate(eyeX, curX, normalConfig);
         animate(eyeY, curY, normalConfig);
         
         // Fire moderately fast so it feels like active observation
         nextMoveDelay = 500 + Math.random() * 700;
      }

      moveTimer = setTimeout(movementEngine, nextMoveDelay);
    };

    const resetIdleTimer = () => {
      clearTimeout(stateTimer);
      clearTimeout(moveTimer);
      clearTimeout(idleTimer);
      
      // Wait 25 seconds of absolute inactivity before getting distracted
      idleTimer = setTimeout(() => {
         setIsIdle(true);
         changeState(); // Start the 7-second state machine
         movementEngine(); // Kickstart the ceaseless motor engine
      }, 25000);
    };

    const handleMouseMove = (e) => {
      setIsIdle(false);
      
      // Get robot position (bottom-right corner)
      const robotX = window.innerWidth - 100;  // Approximate robot center
      const robotY = window.innerHeight - 80;   // Approximate robot center
      
      // Calculate direction from robot to cursor
      const dx = e.clientX - robotX;
      const dy = e.clientY - robotY;
      
      // Normalize to -1, 1 range based on distance
      const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2;
      const x = Math.max(-1, Math.min(1, dx / maxDistance));
      const y = Math.max(-1, Math.min(1, dy / maxDistance));
      
      const fastTrackConfig = { type: "spring", stiffness: 150, damping: 20 };
      
      // Real-time tracking forcefully aligns all internal organs to the mouse
      animate(headX, x, fastTrackConfig);
      animate(headY, y, fastTrackConfig);
      animate(eyeX, x, fastTrackConfig);
      animate(eyeY, y, fastTrackConfig);
      
      // Snap ears back alert
      animate(earRotX, 0, fastTrackConfig);
      animate(earRotZ, 0, fastTrackConfig);
      
      // Wipe structural expressions instantly to normal
      animate(eyeScaleX, 1, fastTrackConfig);
      animate(eyeScaleY, 1, fastTrackConfig);
      animate(angryRedOpacity, 0, fastTrackConfig);
      animate(angryGlowScale, 1, fastTrackConfig);
      animate(browPercent, -120, fastTrackConfig);
      animate(leftBrowRot, 0, fastTrackConfig);
      
      resetIdleTimer();
    };

    // Touch events for mobile tracking
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        
        // Get robot position (bottom-right corner)
        const robotX = window.innerWidth - 100;
        const robotY = window.innerHeight - 80;
        
        // Calculate direction from robot to touch point
        const dx = touch.clientX - robotX;
        const dy = touch.clientY - robotY;
        
        // Normalize to -1, 1 range based on distance
        const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2;
        const x = Math.max(-1, Math.min(1, dx / maxDistance));
        const y = Math.max(-1, Math.min(1, dy / maxDistance));
        
        const fastTrackConfig = { type: "spring", stiffness: 150, damping: 20 };
        
        setIsIdle(false);
        animate(headX, x, fastTrackConfig);
        animate(headY, y, fastTrackConfig);
        animate(eyeX, x, fastTrackConfig);
        animate(eyeY, y, fastTrackConfig);
        
        resetIdleTimer();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    resetIdleTimer(); // trigger initial countdown
    
    // Custom Events for Holographic Panel over-rides
    const handleFocus = (e) => {
      setCustomMessage(e.detail);
      resetIdleTimer(); // Treat interaction with links as activity
    };
    const handleBlur = () => setCustomMessage(null);

    window.addEventListener('robotMessageFocus', handleFocus);
    window.addEventListener('robotMessageBlur', handleBlur);

    return () => {
      clearTimeout(stateTimer);
      clearTimeout(moveTimer);
      clearTimeout(idleTimer);
      clearTimeout(easterEggResetTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('robotMessageFocus', handleFocus);
      window.removeEventListener('robotMessageBlur', handleBlur);
    };
  }, [headX, headY, eyeX, eyeY, tapCount, isIdle]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  // Update mood state based on tap count or idle state
  useEffect(() => {
    if (tapCount > 0) {
      setMoodState('angry'); // Easter egg = angry
    } else if (isIdle) {
      setMoodState('sleepy');
    } else {
      setMoodState('normal');
    }
  }, [tapCount, isIdle]);

  const displayMessage = customMessage || messages[messageIndex];

  // Mood-based color system (low-resource)
  const getMoodColors = () => {
    if (moodState === 'angry') {
      // Angry: Black/white with intense blue shining
      return {
        primaryGradient: `linear-gradient(135deg, #000000 0%, #1e40af 40%, #3b82f6 100%)`,
        accentGradient: `linear-gradient(90deg, #0f172a 0%, rgb(30, 64, 175) 40%, #2563eb 100%)`,
        bodyColor: '#0f172a',
        standColor: '#000000'
      };
    } else if (moodState === 'sleepy') {
      // Sleepy: Black/white with subtle blue hint
      return {
        primaryGradient: `linear-gradient(135deg, #000000 0%, #1e293b 40%, #0f172a 100%)`,
        accentGradient: `linear-gradient(90deg, #0a0e27 0%, rgb(15, 23, 42) 40%, #1e3a8a 100%)`,
        bodyColor: '#0f172a',
        standColor: '#000000'
      };
    } else {
      // Normal: Black/white with bright blue shining
      return {
        primaryGradient: `linear-gradient(135deg, #ffffff 0%, #3b82f6 40%, #1e40af 100%)`,
        accentGradient: `linear-gradient(90deg, #f0f9ff 0%, rgb(100, 150, 255) 40%, #2563eb 100%)`,
        bodyColor: '#0f172a',
        standColor: '#000000'
      };
    }
  };

  const moodColors = getMoodColors();

  if (!isClient) return null;

  const depth = isMobile ? 24 : 64; // depth mapped logically to scaled down object

  return (
    <div className={`fixed z-[100] perspective-[1000px] pointer-events-auto flex flex-col items-center bottom-2 right-2 md:bottom-4 md:right-4`}>
      <motion.div
        className="relative flex flex-col items-center cursor-pointer"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        style={{ 
          transformStyle: "preserve-3d", 
          scale: clickScale,
          scaleX: easterEggScale,
          scaleY: easterEggScale
        }}
        onClick={() => {
          // Easter egg tap handler
          handleEasterEggTap();
          
          // Blink effect
          animate(eyeScaleY, 0.1, { duration: 0.15 });
          setTimeout(() => animate(eyeScaleY, 1, { duration: 0.15 }), 150);
          
          // Scale punch
          animate(clickScale, 1.1, { duration: 0.1, type: 'spring' });
          setTimeout(() => animate(clickScale, 1, { duration: 0.3, type: 'spring', stiffness: 300 }), 100);
          
          // Glow burst
          animate(clickGlowOpacity, 0.8, { duration: 0.1 });
          setTimeout(() => animate(clickGlowOpacity, 0, { duration: 0.5 }), 100);
          
          // Head tilt on click
          animate(headX, (Math.random() * 2 - 1) * 0.3, { duration: 0.3, type: 'spring' });
          animate(headY, (Math.random() * 2 - 1) * 0.3, { duration: 0.3, type: 'spring' });
        }}
      >
        
        {/* HOLOGRAPHIC MESSAGE PANEL */}
        <motion.a
          href="#explore-section"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={{ opacity: 0, y: 20, z: 150, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, z: 150, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="absolute right-0 md:-right-4 -top-16 md:-top-24 z-[999] pointer-events-auto cursor-pointer"
        >
          <motion.div
            animate={{ 
              y: [0, -4, 0], 
              boxShadow: [
                "0 0 15px rgba(138,43,226,0.3), inset 0 0 10px rgba(0,191,255,0.2)", 
                "0 0 25px rgba(138,43,226,0.6), inset 0 0 15px rgba(0,191,255,0.4)", 
                "0 0 15px rgba(138,43,226,0.3), inset 0 0 10px rgba(0,191,255,0.2)"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl border-t border-l border-b border-r border-[#a855f7]/40 backdrop-blur-md bg-gradient-to-br from-[#0f172a]/60 to-[#1e1b4b]/60 text-white font-semibold flex flex-col items-center justify-center min-w-[100px] md:min-w-[160px] text-[10px] md:text-sm relative overflow-hidden transition-transform hover:scale-110"
          >
            {/* Glassmorphism Inner Shine */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.span
                key={displayMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="whitespace-nowrap drop-shadow-[0_0_8px_rgba(200,150,255,0.9)] z-10"
              >
                {displayMessage}
              </motion.span>
            </AnimatePresence>
            
          </motion.div>
          {/* Subtle Connector Light Drop */}
          <div className="absolute -bottom-4 right-10 md:right-12 w-[2px] h-4 bg-gradient-to-t from-[#a855f7]/60 to-transparent blur-[1px]"></div>
        </motion.a>

        {/* TRUE CSS 3D CONICAL STAND - NEW POLISHED SAPPHIRE COLOR */}
        <motion.div 
           className="absolute top-10 md:top-20 w-10 h-14 md:w-20 md:h-28"
           style={{ 
             transformStyle: 'preserve-3d', 
             rotateX: bodyRotateX, 
             rotateY: bodyRotateY,
             transformOrigin: 'top center'
           }}
        >
           <div 
             className="absolute inset-0"
             style={{
                background: moodColors.standColor === '#000000' 
                  ? `linear-gradient(90deg, #000000 0%, #60a5fa 35%, #3b82f6 65%, #1e40af 100%)`
                  : `linear-gradient(90deg, #000000 0%, #60a5fa 35%, #3b82f6 65%, #1e40af 100%)`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                transform: `translateZ(${isMobile ? '-6px' : '-15px'})`
             }}
           ></div>
           <div 
             className="absolute inset-0 opacity-70 mix-blend-multiply"
             style={{
               background: 'linear-gradient(180deg, #020617 0%, transparent 60%)',
               clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
               transform: `translateZ(${isMobile ? '-5px' : '-14px'})`
             }}
           ></div>
        </motion.div>

        {/* MATHEMATICALLY PERFECT EXTRUDED HEAD (12 Layers, Zero Lag) */}
        <motion.div
          className="relative w-[90px] h-[52px] md:w-[200px] md:h-[112px]"
          style={{ 
             transformStyle: 'preserve-3d', 
             rotateX, 
             rotateY,
          }}
        >
          {/* Click Glow Effect */}
          <motion.div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ 
              opacity: clickGlowOpacity,
              background: 'radial-gradient(circle, rgba(138,43,226,0.8) 0%, rgba(59,130,246,0.4) 100%)',
              filter: 'blur(8px)',
              zIndex: -1
            }}
          />
          
          {/* Easter Egg Heat Effect Override */}
          <motion.div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ 
              opacity: easterEggHeat,
              background: 'radial-gradient(circle, rgba(255, 107, 107, 0.9) 0%, rgba(220, 38, 38, 0.5) 100%)',
              filter: 'blur(12px)',
              zIndex: -2
            }}
          />
          
          {Array.from({ length: 12 }).map((_, i) => {
             const zOffset = (depth / 2) - (i * (depth / 11));
             
             let bg = `none`;
             let isFront = i === 0;
             let isBack = i === 11;
             
             if (isFront) {
                 // Use mood-based primary gradient
                 bg = moodColors.primaryGradient;
             } else if (isBack) {
                 bg = '#0f172a'; // Deep backplate
             } else {
                 // Use mood-based accent gradient
                 bg = moodColors.accentGradient;
             }

             return (
               <div
                  key={`head-slice-${i}`}
                  className="absolute inset-0 rounded-xl md:rounded-2xl"
                  style={{
                    background: bg,
                    transform: `translateZ(${zOffset}px)`,
                    boxShadow: isFront ? 'inset 0 2px 10px rgba(255,255,255,0.2)' : 
                               isBack ? '0 0 20px rgba(0,0,0,0.8)' : 'none',
                    border: isFront ? `1px solid rgba(${moodState === 'angry' ? '59, 130, 246' : moodState === 'sleepy' ? '30, 58, 138' : '59, 130, 246'}, 0.6)` : 'none'
                  }}
               >
                  {/* FACEPLATE ONLY ON THE FRONT SLICE */}
                  {isFront && (
                     <div 
                        className="absolute inset-[3px] md:inset-[6px] rounded-lg md:rounded-xl border border-[#0f172a] flex items-center justify-center gap-2 md:gap-8 overflow-hidden"
                        style={{
                           // Black/white/blue faceplate
                           background: moodState === 'angry' 
                             ? 'radial-gradient(ellipse at center top, #1e40af 0%, #0f172a 50%, #000000 100%)'
                             : moodState === 'sleepy'
                             ? 'radial-gradient(ellipse at center top, #0a0e27 0%, #0f172a 50%, #000000 100%)'
                             : 'radial-gradient(ellipse at center top, #3b82f6 0%, #1e40af 50%, #000000 100%)',
                           boxShadow: 'inset 4px 4px 15px rgba(0,0,0,0.9), inset -2px -2px 8px rgba(59,130,246,0.3)'
                        }}
                     >
                           {/* LEFT EYE SOCKET */}
                           <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#020617] shadow-[inset_0_4px_12px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden">
                              {/* Glowing Core */}
                              <motion.div 
                                className="w-3 h-3 md:w-6 md:h-6 rounded-full relative overflow-hidden"
                                style={{
                                  background: 'radial-gradient(circle, #ffffff 10%, #fef08a 60%, #eab308 100%)',
                                  boxShadow: '0 0 5px #fef08a, 0 0 10px #eab308',
                                  x: eyeMoveX, y: eyeMoveY,
                                  scaleX: eyeScaleX, scaleY: eyeScaleY,
                                  scale: angryGlowScale
                                }}
                              >
                                {/* Blood Red Attack Mode Tint Overlay */}
                                <motion.div 
                                   className="absolute inset-0 bg-red-600 mix-blend-color z-10"
                                   style={{ opacity: angryRedOpacity }}
                                ></motion.div>
                                <div className="absolute top-[20%] left-[20%] w-1 h-1 md:w-3 md:h-3 bg-white/80 rounded-full blur-[1px] z-20"></div>
                              </motion.div>
                              <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/40 to-transparent rounded-b-full pointer-events-none mix-blend-screen scale-x-[1.2]"></div>
                              <div className="absolute bottom-[2px] right-[2px] w-[40%] h-[40%] bg-white/10 rounded-full blur-[1px] md:blur-[2px] pointer-events-none"></div>
                              
                              {/* DYNAMIC FIERCE V-EYELID */}
                              <motion.div
                                 className="absolute top-0 left-[-30%] w-[160%] h-[100%] bg-[#020617] z-10 border-b-2 border-red-500/80"
                                 style={{
                                    y: dynamicBrowY,
                                    rotateZ: leftBrowRot,
                                    transformOrigin: "center bottom",
                                    boxShadow: '0 4px 10px rgba(220, 38, 38, 0.4)'
                                 }}
                              />
                           </div>
                        
                           {/* RIGHT EYE SOCKET */}
                           <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#020617] shadow-[inset_0_4px_12px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden">
                              {/* Glowing Core */}
                              <motion.div 
                                className="w-3 h-3 md:w-6 md:h-6 rounded-full relative overflow-hidden"
                                style={{
                                  background: 'radial-gradient(circle, #ffffff 10%, #fef08a 60%, #eab308 100%)',
                                  boxShadow: '0 0 5px #fef08a, 0 0 10px #eab308',
                                  x: eyeMoveX, y: eyeMoveY,
                                  scaleX: eyeScaleX, scaleY: eyeScaleY,
                                  scale: angryGlowScale
                                }}
                              >
                                {/* Blood Red Attack Mode Tint Overlay */}
                                <motion.div 
                                   className="absolute inset-0 bg-red-600 mix-blend-color z-10"
                                   style={{ opacity: angryRedOpacity }}
                                ></motion.div>
                                <div className="absolute top-[20%] left-[20%] w-1 h-1 md:w-3 md:h-3 bg-white/80 rounded-full blur-[1px] z-20"></div>
                              </motion.div>
                              <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/40 to-transparent rounded-b-full pointer-events-none mix-blend-screen scale-x-[1.2]"></div>
                              <div className="absolute bottom-[2px] right-[2px] w-[40%] h-[40%] bg-white/10 rounded-full blur-[1px] md:blur-[2px] pointer-events-none"></div>
                              
                              {/* DYNAMIC FIERCE V-EYELID */}
                              <motion.div
                                 className="absolute top-0 left-[-30%] w-[160%] h-[100%] bg-[#020617] z-10 border-b-2 border-red-500/80"
                                 style={{
                                    y: dynamicBrowY,
                                    rotateZ: rightBrowRot,
                                    transformOrigin: "center bottom",
                                    boxShadow: '0 4px 10px rgba(220, 38, 38, 0.4)'
                                 }}
                              />
                           </div>
                        
                        {/* SCREEN REFLECTIONS */}
                        <div className="absolute top-0 left-0 w-[150%] h-[45%] bg-gradient-to-b from-white/20 to-transparent transform -rotate-[15deg] origin-top-left pointer-events-none mix-blend-screen"></div>
                        <div className="absolute bottom-[-10px] right-0 w-[100%] h-[30%] bg-gradient-to-t from-[#93c5fd]/30 to-transparent transform rotate-[5deg] origin-bottom-right pointer-events-none mix-blend-screen rounded-b-xl blur-[1px] md:blur-[2px]"></div>
                     </div>
                  )}

                  {/* SMALL PILL PORT ON RIGHT SIDE (rendered on a middle slice) */}
                  {i === 5 && (
                     <div className="absolute right-0 top-1/2 mt-[-6px] md:mt-[-15px] w-1 h-3 md:w-3 md:h-8 bg-[#020617] rounded-l-full shadow-inner border-r border-[#1e3a8a]/50"></div>
                  )}

                  {/* MOOD-REACTIVE 3D CAT EARS ON THE REARMOST SLICE */}
                  {isBack && (
                     <AnimatePresence>
                        {isIdle && (
                           <>
                              {/* LEFT CUTE EAR */}
                              <motion.div 
                                 initial={{ scale: 0, opacity: 0, y: 10 }}
                                 animate={{ scale: 1, opacity: 1, y: 0 }}
                                 exit={{ scale: 0, opacity: 0, y: 10 }}
                                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                 className="absolute top-[-38%] left-[10%] w-[25%] h-[40%] origin-bottom overflow-hidden"
                                 style={{
                                    background: 'linear-gradient(to top, rgba(30, 58, 138, 0.9) 0%, rgba(192, 132, 252, 0.4) 100%)',
                                    clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)',
                                    backdropFilter: 'blur(4px)',
                                    rotateX: earRotX,
                                    rotateZ: leftEarRotZ
                                 }}
                              >
                                 {/* Cute soft pink/purple inner ear core */}
                                 <div className="absolute inset-0 top-[15%] left-[25%] w-[50%] h-[80%] origin-bottom" style={{ clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)', background: 'linear-gradient(to top, rgba(236,72,153,0.8) 0%, rgba(232,121,249,0.2) 100%)' }}></div>
                                 {/* Rim lighting */}
                                 <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(255,255,255,0.6)]" style={{ clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)' }}></div>
                              </motion.div>

                              {/* RIGHT CUTE EAR */}
                              <motion.div 
                                 initial={{ scale: 0, opacity: 0, y: 10 }}
                                 animate={{ scale: 1, opacity: 1, y: 0 }}
                                 exit={{ scale: 0, opacity: 0, y: 10 }}
                                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                 className="absolute top-[-38%] right-[10%] w-[25%] h-[40%] origin-bottom overflow-hidden"
                                 style={{
                                    background: 'linear-gradient(to top, rgba(30, 58, 138, 0.9) 0%, rgba(192, 132, 252, 0.4) 100%)',
                                    clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)',
                                    backdropFilter: 'blur(4px)',
                                    rotateX: earRotX,
                                    rotateZ: earRotZ
                                 }}
                              >
                                 {/* Cute soft pink/purple inner ear core */}
                                 <div className="absolute inset-0 top-[15%] left-[25%] w-[50%] h-[80%] origin-bottom" style={{ clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)', background: 'linear-gradient(to top, rgba(236,72,153,0.8) 0%, rgba(232,121,249,0.2) 100%)' }}></div>
                                 {/* Rim lighting */}
                                 <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(255,255,255,0.6)]" style={{ clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)' }}></div>
                              </motion.div>
                           </>
                        )}
                     </AnimatePresence>
                  )}
               </div>
             );
          })}
        </motion.div>

        {/* Floor shadow standalone */}
        <div className="mt-3 md:mt-4 w-12 md:w-32 h-1.5 md:h-4 bg-black/70 blur-[4px] md:blur-[12px] rounded-[50%]"></div>

      </motion.div>
    </div>
  );
};

export default RobotAssistant;
