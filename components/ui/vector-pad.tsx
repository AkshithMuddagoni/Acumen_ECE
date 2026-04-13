"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface VectorPadProps {
  onSelectTechnical?: () => void;
  onSelectNonTechnical?: () => void;
  onClose?: () => void;
}

const HOLD_DURATION_MS = 600; // Time to hold for selection

export const VectorPad: React.FC<VectorPadProps> = ({ 
  onSelectTechnical, 
  onSelectNonTechnical,
  onClose 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartTimeRef = useRef<number>(0);
  const [isMobile, setIsMobile] = React.useState(false);
  
  const [isActive, setIsActive] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [selectedSide, setSelectedSide] = useState<"technical" | "non-technical" | null>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current || isHolding) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.min(Math.max(x, 0), 100);
    const clampedY = Math.min(Math.max(y, 0), 100);

    setCursorPos({ x: clampedX, y: clampedY });
    setSelectedSide(clampedX < 50 ? "technical" : "non-technical");
  }, [isHolding]);

  const handlePointerDown = useCallback(() => {
    holdStartTimeRef.current = Date.now();
    setIsHolding(true);
    setHoldProgress(0);

    // On mobile: trigger immediately
    if (isMobile) {
      setHoldProgress(1);
      if (selectedSide === "technical") {
        onSelectTechnical?.();
      } else if (selectedSide === "non-technical") {
        onSelectNonTechnical?.();
      }
      setIsHolding(false);
      return;
    }

    // On desktop: Lightweight hold timer with progress updates
    const holdStartTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - holdStartTime;
      const progress = Math.min(elapsed / HOLD_DURATION_MS, 1);
      setHoldProgress(progress);

      if (elapsed < HOLD_DURATION_MS) {
        holdTimerRef.current = setTimeout(updateProgress, 16); // ~60fps
      }
    };
    
    holdTimerRef.current = setTimeout(updateProgress, 16);
  }, [isMobile, selectedSide, onSelectTechnical, onSelectNonTechnical]);

  const handlePointerUp = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    // On mobile: already handled in handlePointerDown
    if (isMobile) {
      setIsHolding(false);
      setHoldProgress(0);
      return;
    }

    const holdDuration = Date.now() - holdStartTimeRef.current;
    
    if (holdDuration >= HOLD_DURATION_MS && selectedSide) {
      // Trigger selection
      if (selectedSide === "technical") {
        onSelectTechnical?.();
      } else {
        onSelectNonTechnical?.();
      }
    }
    
    setIsHolding(false);
    setHoldProgress(0);
  }, [isMobile, selectedSide, onSelectTechnical, onSelectNonTechnical]);

  const handlePointerLeave = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsActive(false);
    setIsHolding(false);
    setHoldProgress(0);
    setSelectedSide(null);
    setCursorPos({ x: 50, y: 50 });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isTechnical = selectedSide === "technical";
  const isNonTechnical = selectedSide === "non-technical";
  const isConfirmed = holdProgress >= 1;
  
  // Two distinct color themes
  const getTechColors = () => ({
    border: isConfirmed ? "#9D4EDD" : isTechnical ? "#7B2CBF" : "#5A189A",
    glow: isConfirmed ? "rgba(157, 78, 221, 0.8)" : "rgba(123, 44, 191, 0.7)",
    crosshair: isConfirmed ? "#E0AAFF" : "#C77DFF",
    bg: isTechnical ? "rgba(123, 44, 191, 0.2)" : "rgba(90, 25, 154, 0.08)"
  });

  const getNonTechColors = () => ({
    border: isConfirmed ? "#FF9E1B" : isNonTechnical ? "#FF8C00" : "#FF7300",
    glow: isConfirmed ? "rgba(255, 158, 27, 0.8)" : "rgba(255, 140, 0, 0.7)",
    crosshair: isConfirmed ? "#FFD700" : "#FFA500",
    bg: isNonTechnical ? "rgba(255, 140, 0, 0.2)" : "rgba(255, 115, 0, 0.08)"
  });

  const techColors = getTechColors();
  const nonTechColors = getNonTechColors();
  
  const colors = useMemo(() => ({
    border: isTechnical ? techColors.border : nonTechColors.border,
    glow: isTechnical ? techColors.glow : nonTechColors.glow,
    crosshair: isTechnical ? techColors.crosshair : nonTechColors.crosshair,
    bg: isTechnical ? techColors.bg : nonTechColors.bg,
    techBorder: techColors.border,
    techGlow: techColors.glow,
    nonTechBorder: nonTechColors.border,
    nonTechGlow: nonTechColors.glow
  }), [isTechnical, isNonTechnical, isConfirmed]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(0deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "drift 20s linear infinite"
        }}
      />

      {/* Radial Glow Background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 217, 255, 0.05) 0%, transparent 70%)",
          pointerEvents: "none"
        }}
      />

      <style>{`
        @keyframes drift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}</style>

      <div className="relative z-10 w-full flex flex-col items-center justify-between h-full py-16 px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center -space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-black tracking-[0.15em] drop-shadow-lg" 
            style={{ 
              fontFamily: "'ComputerRegular', monospace",
              background: "linear-gradient(90deg, #7B2CBF 0%, #FF8C00 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 25px rgba(123, 44, 191, 0.4)"
            }}>
            EVENT_SELECTOR
          </h1>
          <motion.div 
            className="text-xs tracking-widest uppercase font-extrabold h-6 pt-2"
            animate={{ 
              color: isActive ? (isConfirmed ? "#FF9E1B" : isTechnical ? "#C77DFF" : "#FFA500") : "#6B7280"
            }}
            transition={{ duration: 0.2 }}
          >
            {isMobile ? (
              isActive ? (isConfirmed ? "✓ CONFIRMED" : "👆 READY TO TAP") : "👆 TAP TO SELECT"
            ) : (
              isActive ? (isConfirmed ? "✓ CONFIRMED" : isHolding ? "⚡ PRESSING..." : "📍 TRACKING") : "🔍 HOVER TO START"
            )}
          </motion.div>
        </motion.div>

        {/* Main Interactive Box */}
        <motion.div 
          ref={containerRef}
          className="relative w-full max-w-3xl h-96 rounded-2xl overflow-hidden cursor-crosshair shadow-2xl transition-all duration-200"
          style={{
            border: `3px solid ${isTechnical ? colors.techBorder : nonTechColors.border}`,
            boxShadow: `0 0 50px ${isTechnical ? colors.techGlow : nonTechColors.glow}, inset 0 0 40px ${(isTechnical ? colors.techGlow : nonTechColors.glow).replace("0.8", "0.1").replace("0.7", "0.08")}`,
            background: "linear-gradient(135deg, rgba(15, 20, 40, 0.95) 0%, rgba(10, 15, 30, 0.95) 100%)",
            willChange: "box-shadow, border-color",
            backfaceVisibility: "hidden"
          }}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          animate={{ boxShadow: `0 0 ${isActive ? 60 : 50}px ${isTechnical ? colors.techGlow : nonTechColors.glow}` }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(0deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />

          {/* Left - Technical (Purple Theme) */}
          <motion.div
            className="absolute inset-0 w-1/2 flex items-center justify-center border-r"
            style={{ borderColor: "rgba(123, 44, 191, 0.5)" }}
            animate={{
              backgroundColor: isTechnical ? `rgba(123, 44, 191, ${0.15 + holdProgress * 0.2})` : "rgba(123, 44, 191, 0.05)"
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="text-center pointer-events-none">
              <motion.div 
                className="text-3xl font-black tracking-[0.13em] mb-3 drop-shadow-md"
                style={{ fontFamily: "'ComputerRegular', monospace", color: "#C77DFF" }}
                animate={{ scale: isTechnical ? 1.05 + holdProgress * 0.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                TECHNICAL
              </motion.div>
              <motion.div 
                className="text-sm font-mono font-bold tracking-wider"
                animate={{ 
                  color: isConfirmed && isTechnical ? "#E0AAFF" : "rgb(199, 125, 255)",
                  scale: isConfirmed && isTechnical ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {isConfirmed && isTechnical ? "✓ SELECTED" : isMobile ? "← TAP" : isHolding && isTechnical ? "← HOLD" : "← PRESS"}
              </motion.div>
              {/* Hold Progress Bar */}
              {isTechnical && isHolding && (
                <div className="mt-2 h-1 w-32 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(123, 44, 191, 0.3)" }}>
                  <motion.div 
                    className="h-full"
                    style={{ background: "linear-gradient(to right, #7B2CBF, #C77DFF)" }}
                    style={{ width: `${holdProgress * 100}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Right - Non-Technical (Orange Theme) */}
          <motion.div
            className="absolute inset-0 w-1/2 left-1/2 flex items-center justify-center"
            animate={{
              backgroundColor: isNonTechnical ? `rgba(255, 140, 0, ${0.15 + holdProgress * 0.2})` : "rgba(255, 140, 0, 0.05)"
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="text-center pointer-events-none">
              <motion.div 
                className="text-3xl font-black tracking-[0.13em] mb-3 drop-shadow-md"
                style={{ fontFamily: "'ComputerRegular', monospace", color: "#FFA500" }}
                animate={{ scale: isNonTechnical ? 1.05 + holdProgress * 0.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                NON-TECH
              </motion.div>
              <motion.div 
                className="text-sm font-mono font-bold tracking-wider"
                animate={{ 
                  color: isConfirmed && isNonTechnical ? "#FFD700" : "rgb(255, 165, 0)",
                  scale: isConfirmed && isNonTechnical ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {isConfirmed && isNonTechnical ? "✓ SELECTED" : isMobile ? "TAP →" : isHolding && isNonTechnical ? "HOLD →" : "PRESS →"}
              </motion.div>
              {/* Hold Progress Bar */}
              {isNonTechnical && isHolding && (
                <div className="mt-2 h-1 w-32 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255, 140, 0, 0.3)" }}>
                  <motion.div 
                    className="h-full"
                    style={{ background: "linear-gradient(to right, #FF8C00, #FFD700)" }}
                    style={{ width: `${holdProgress * 100}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Center Divider - Gradient with Theme Colors */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(123, 44, 191, 0.4), rgba(255, 140, 0, 0.8), rgba(123, 44, 191, 0.4))",
              boxShadow: "0 0 20px rgba(200, 100, 200, 0.5)"
            }}
          />

          {/* Crosshairs - Plus Symbol Design */}
          {isActive && (
            <>
              {/* Vertical Line of Plus */}
              <motion.div
                className="absolute top-0 bottom-0 w-px z-30 pointer-events-none"
                style={{
                  left: `${cursorPos.x}%`,
                  background: isTechnical 
                    ? "linear-gradient(to bottom, transparent, rgba(199, 125, 255, 0.8), transparent)"
                    : "linear-gradient(to bottom, transparent, rgba(255, 165, 0, 0.8), transparent)",
                  boxShadow: isTechnical 
                    ? "0 0 25px rgba(199, 125, 255, 0.9)"
                    : "0 0 25px rgba(255, 165, 0, 0.9)",
                  willChange: "left, box-shadow"
                }}
                transition={{ type: "tween", duration: 0 }}
              />

              {/* Horizontal Line of Plus */}
              <motion.div
                className="absolute left-0 right-0 h-px z-30 pointer-events-none"
                style={{
                  top: `${cursorPos.y}%`,
                  background: isTechnical 
                    ? "linear-gradient(to right, transparent, rgba(199, 125, 255, 0.8), transparent)"
                    : "linear-gradient(to right, transparent, rgba(255, 165, 0, 0.8), transparent)",
                  boxShadow: isTechnical 
                    ? "0 0 25px rgba(199, 125, 255, 0.9)"
                    : "0 0 25px rgba(255, 165, 0, 0.9)",
                  willChange: "top, box-shadow"
                }}
                transition={{ type: "tween", duration: 0 }}
              />

              {/* Center Dot of Plus */}
              <motion.div
                className="absolute w-2 h-2 rounded-full z-40 pointer-events-none"
                style={{
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: isTechnical ? "#E0AAFF" : "#FFD700",
                  boxShadow: isTechnical 
                    ? "0 0 20px rgba(224, 170, 255, 1), 0 0 40px rgba(199, 125, 255, 0.8)"
                    : "0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 165, 0, 0.8)",
                  willChange: "transform, box-shadow"
                }}
                animate={{ scale: isHolding ? 1.3 : 1 }}
                transition={{ duration: 0.15 }}
              />

              {/* Corner Markers (optional accents) */}
              <motion.div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                {/* Top-left corner */}
                <div 
                  className="absolute w-4 h-4"
                  style={{
                    top: "-24px",
                    left: "-24px",
                    borderTop: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)",
                    borderLeft: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)"
                  }}
                />
                {/* Top-right corner */}
                <div 
                  className="absolute w-4 h-4"
                  style={{
                    top: "-24px",
                    right: "-24px",
                    borderTop: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)",
                    borderRight: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)"
                  }}
                />
                {/* Bottom-left corner */}
                <div 
                  className="absolute w-4 h-4"
                  style={{
                    bottom: "-24px",
                    left: "-24px",
                    borderBottom: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)",
                    borderLeft: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)"
                  }}
                />
                {/* Bottom-right corner */}
                <div 
                  className="absolute w-4 h-4"
                  style={{
                    bottom: "-24px",
                    right: "-24px",
                    borderBottom: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)",
                    borderRight: isTechnical ? "2px solid rgba(199, 125, 255, 0.6)" : "2px solid rgba(255, 165, 0, 0.6)"
                  }}
                />
              </motion.div>
            </>
          )}

        </motion.div>

        {/* Footer with Status */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.p 
            className="text-xs mb-3 tracking-wide font-mono"
            style={{
              color: isTechnical ? "rgba(199, 125, 255, 0.7)" : isNonTechnical ? "rgba(255, 165, 0, 0.7)" : "rgba(150, 150, 150, 0.7)"
            }}
          >
            {isActive && !isHolding && "👆 Move cursor to select • Hold to confirm"}
            {isHolding && `⏱️ Holding... (${Math.round(holdProgress * 100)}%)`}
            {!isActive && "👁️ Hover over the box to activate selector"}
          </motion.p>
          <button
            onClick={onClose}
            className="text-sm font-bold tracking-widest transition-all uppercase px-5 py-2 rounded-lg border hover:shadow-lg" 
            style={{ 
              fontFamily: "'ComputerRegular', monospace",
              color: isTechnical ? "#C77DFF" : "#FFA500",
              borderColor: isTechnical ? "rgba(199, 125, 255, 0.4)" : "rgba(255, 165, 0, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isTechnical ? "rgba(199, 125, 255, 0.7)" : "rgba(255, 165, 0, 0.7)";
              e.currentTarget.style.boxShadow = isTechnical ? "0 0 20px rgba(199, 125, 255, 0.3)" : "0 0 20px rgba(255, 165, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isTechnical ? "rgba(199, 125, 255, 0.4)" : "rgba(255, 165, 0, 0.4)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            CLOSE [ESC]
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default VectorPad;
