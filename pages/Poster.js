import { Footer, Navbar, Navbar_Prim } from '../components';
import { About1, Feedback, GetStarted1, Hero1 } from '../sections';
import React from 'react'

const Poster = () => {
  return (
  <div className="bg-transparent overflow-hidden">
    <Navbar_Prim />
    <div className="gradient-02 z-0" />

    <Hero1 />
    <div className="relative">
      <About1 />
      <div className="gradient-03 z-0" />
      {/* <Explore />
    </div>
    <div className="relative">
      <WhatsNew />
      <div className="gradient-04 z-0" /> */}
      <GetStarted1 />
    </div>
    {/* <div className="relative">
      <Insights />
      <Feedback />
      <div className="gradient-04 z-0" />
    </div> */}
    <Footer />
  </div>
);
}

export default Poster