import { Footer, Navbar, Navbar_Prim } from '../components';
import { Hero4, TechEventsGallery, GetStarted4 } from '../sections';
import React from 'react'

const RoboticEvents = () => {
  return (
    <div className="bg-transparent overflow-hidden">
      <Navbar_Prim />
      <div className="gradient-01 z-0" />
      <Hero4 />
      <div className="relative">
        <div className="gradient-07 z-0" />
        <TechEventsGallery />
      </div>
      <Footer />
    </div>
  );
}

export default RoboticEvents