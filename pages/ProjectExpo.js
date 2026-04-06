import { Footer, Navbar, Navbar_Prim } from '../components';
import { About3, Feedback, GetStarted3, Hero3 } from '../sections';
import React from 'react'

const ProjectExpo = () => {
  return (
  <div className="bg-transparent overflow-hidden">
    <Navbar_Prim />
    <div className="gradient-02 z-0" />
    <Hero3 />
    <div className="relative">
      <About3 />
      <div className="gradient-03 z-0" />
      <GetStarted3 />
    </div>
    {/* <div className="relative">
      <Feedback />
      <div className="gradient-04 z-0" />
    </div> */}
    <Footer />
  </div>
);
}

export default ProjectExpo