"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeamPath {
  path: string;
  gradientConfig: {
    initial: {
      x1: string;
      x2: string;
      y1: string;
      y2: string;
    };
    animate: {
      x1: string | string[];
      x2: string | string[];
      y1: string | string[];
      y2: string | string[];
    };
    transition?: {
      duration?: number;
      repeat?: number;
      repeatType?: string;
      ease?: string;
      repeatDelay?: number;
      delay?: number;
    };
  };
  connectionPoints?: Array<{
    cx: number;
    cy: number;
    r: number;
  }>;
}

interface PulseBeamsProps {
  children?: React.ReactNode;
  className?: string;
  background?: React.ReactNode;
  beams: BeamPath[];
  width?: number;
  height?: number;
  baseColor?: string;
  accentColor?: string;
  gradientColors?: {
    start: string;
    middle: string;
    end: string;
  };
}

export const PulseBeams = ({
  children,
  className,
  background,
  beams,
  width = 858,
  height = 434,
  baseColor = "var(--slate-800)",
  accentColor = "var(--slate-600)",
  gradientColors,
}: PulseBeamsProps) => {
  return (
    <div
      className={cn(
        "w-full relative flex items-center justify-center antialiased overflow-hidden",
        className
      )}
    >
      {background}
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs
          beams={beams}
          width={width}
          height={height}
          baseColor={baseColor}
          accentColor={accentColor}
          gradientColors={gradientColors}
        />
      </div>
    </div>
  );
};

const SVGs = ({ beams, width, height, baseColor, accentColor, gradientColors }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      {beams.map((beam, index) => (
        <React.Fragment key={index}>
          <path
            d={beam.path}
            stroke="url(#glow${index})"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
            filter="url(#softGlow)"
          />
          <path
            d={beam.path}
            stroke={`url(#grad${index})`}
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#brightGlow)"
          />
          <path
            d={beam.path}
            stroke={`url(#grad${index})`}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          {beam.connectionPoints?.map((point, pointIndex) => (
            <React.Fragment key={`${index}-${pointIndex}`}>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      <defs>
        <filter id="brightGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        {beams.map((beam, index) => (
          <React.Fragment key={index}>
            <motion.linearGradient
              id={`grad${index}`}
              gradientUnits="userSpaceOnUse"
              initial={beam.gradientConfig.initial}
              animate={beam.gradientConfig.animate}
              transition={beam.gradientConfig.transition}
            >
              <GradientColors colors={gradientColors} />
            </motion.linearGradient>
            <motion.linearGradient
              id={`glow${index}`}
              gradientUnits="userSpaceOnUse"
              initial={beam.gradientConfig.initial}
              animate={beam.gradientConfig.animate}
              transition={beam.gradientConfig.transition}
            >
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </motion.linearGradient>
          </React.Fragment>
        ))}
      </defs>
    </svg>
  );
};

const GradientColors = ({ colors = {
  start: "#00F0FF",
  middle: "#06B6D4",
  end: "#00D9FF"
} }) => {
  return (
    <>
      <stop offset="0%" stopColor={colors.start} stopOpacity="0" />
      <stop offset="20%" stopColor={colors.start} stopOpacity="1" />
      <stop offset="50%" stopColor={colors.middle} stopOpacity="1" />
      <stop offset="100%" stopColor={colors.end} stopOpacity="0" />
    </>
  );
};
