import { Footer, Navbar, Navbar_Prim } from '../components';
import { About4, Explore4, Feedback, GetStarted4, Hero4 } from '../sections';
import React from 'react'

const RoboticEvents = () => {
  return (
    <div className="bg-transparent overflow-hidden">
    <Navbar_Prim />
    <div className="gradient-01 z-0 " />
    <div className="bg-[url('/tech_events.jpeg')] bg-cover bg-opacity-0 text-center h-screen flex flex-col justify-center p-5">
    <div class="absolute inset-0 bg-black/50 "></div>
    <Hero4 />
    </div>
    <div className="relative">

      <div className="gradient-07 z-0" />
      <Explore4 />

 
    </div>
    {/* <div className="relative">
      <Feedback />
      <div className="gradient-04 z-0" />
    </div> */}
    <Footer />
  </div>
);
}

export default RoboticEvents