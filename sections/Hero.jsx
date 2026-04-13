"use client";

import UnicornScene from "unicornstudio-react";
import { HeroRegisterButton } from "../components";

const Hero = ({ onRegisterClick }) => {
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
      `}</style>

      {/* Hero Content Container */}
      <div className="flex flex-col items-center justify-center w-full flex-grow">

        {/* Unicorn Scene */}
        <div className="flex items-center justify-center w-full relative">
          <UnicornScene
            projectId="uJ8kODKLEh5jtBqz3EKW"
            width="1440px"
            height="900px"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
          />
          {/* Hide bottom text overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* Register Button Below Icon */}
        <div className="relative z-30 -mt-12 mb-8">
          <HeroRegisterButton onRegisterClick={onRegisterClick} />
        </div>
      </div>

      {/* Bottom Fade Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, rgba(1, 5, 17, 0.2) 0%, #010511 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
