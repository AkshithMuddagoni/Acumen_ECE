'use client';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {

  const particlesInit = async (main) => {
    
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent"
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#008080"
          },
          links: {
            color: "#008080",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1
          },
          number: {
            value: 40
          },
          opacity: {
            value: 0.4
          },
          opacity: {
               value: 0.3
         },
          shape: {
            type: "circle"
          },
          size: {
            value: 2
          }
        }
      }}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};
 
export default ParticlesBackground;