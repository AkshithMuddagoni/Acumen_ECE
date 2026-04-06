import { Footer, Navbar, Navbar_Prim } from '../components';
import { About2, Feedback, GetStarted2, Hero2,Explore5 } from '../sections';
import React from 'react'

const Paper = () => {
  return (
  <div className="bg-transparent overflow-hidden">
    <Navbar_Prim />
    <div className="gradient-02 z-0" />
    <Hero2 />
    <div className="relative">
      <div className="gradient-03 z-0" />
      <Explore5 />
      <div className="gradient-04 z-0" />
    </div>
    {/* <div className="relative">
      <Feedback />
      <div className="gradient-04 z-0" />
    </div> */}
    <Footer />
  </div>
);
}
 
export default Paper