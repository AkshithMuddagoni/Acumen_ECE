"use client";

import React from "react";
import UnicornScene from "unicornstudio-react";
import { HeroRegisterButton } from "../components";

const Hero = ({ onRegisterClick }) => {
  // Detect mobile for responsive dimensions
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-transparent flex flex-col items-center justify-center">
      <style jsx global>{`
        a[href*="unicorn.studio?utm_source=public-url"] {
          display: none !important;
        }
        /* Hide bottom text in Unicorn scene */
        [data-testid="unicorn-scene"] tspan:last-child {
          display: none !important;
        }
        /* GPU acceleration for smooth rendering */
        [data-testid="unicorn-scene"],
        [data-testid="unicorn-scene"] canvas {
          transform: translate3d(0, 0, 0);
          will-change: contents;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
        /* Reduce jitter on mobile */
        @media (max-width: 768px) {
          [data-testid="unicorn-scene"] {
            transform: translate3d(0, 0, 0);
            will-change: transform;
          }
        }
      `}</style>

      {/* Hero Content Container */}
      <div className="flex flex-col items-center justify-center w-full flex-grow">

        {/* Unicorn Scene - Optimized for Mobile */}
        <div className="flex items-center justify-center w-full relative will-change-transform">
          <UnicornScene
            projectId="uJ8kODKLEh5jtBqz3EKW"
            width={isMobile ? "1008px" : "1440px"}
            height={isMobile ? "630px" : "900px"}
            scale={isMobile ? 0.7 : 1}
            dpi={isMobile ? 1.3 : 1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
          />
          {/* Hide bottom text overlay - optimized */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10 will-change-auto" />
        </div>

        {/* Register Button Below Icon */}
        <div className="relative z-30 -mt-12 mb-8 will-change-transform">
          <HeroRegisterButton onRegisterClick={onRegisterClick} />
        </div>
      </div>

      {/* Bottom Fade Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none will-change-auto"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, rgba(1, 5, 17, 0.2) 0%, #010511 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
