import { Footer, Navbar, Navbar_Prim } from '../components';
import { About5, Explore5, Feedback, GetStarted5, Hero5 } from '../sections';
import React from 'react'

const TechnicalEvents = () => {
  return (
  <div className="bg-transparent overflow-hidden">
    <Navbar_Prim />
    <div className="gradient-01 z-0" />
    <div className="bg-[url('/non_tech.jpeg')] bg-cover bg-opacity-0 text-center h-screen flex flex-col justify-center items-center p-5">
    <div class="absolute inset-0 bg-black/50 "></div>
    <Hero5 />
    </div>
    <div className="relative">

      <div className="gradient-08 z-0" />
      <Explore5 />

 
    </div>
    {/* <div className="relative">
      <Feedback />
      <div className="gradient-04 z-0" />
    </div> */}
    <Footer />
  </div>
);
}

export default TechnicalEvents