import { useRef, useState, useEffect } from 'react';
import { Footer, Navbar, Navbar_Prim, Sponsors, VectorPad } from '../components';
import { Explore, Feedback, Hero } from '../sections';
import RobotAssistant from '../components/RobotAssistant';
//import ChatBot from '../components/ChatBot';

const Page = () => {
  const exploreRef = useRef(null);

  // ✅ GLOBAL STATE
  const [open, setOpen] = useState(false);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const register = params.get('register');

  if (register === 'true') {
    setOpen(true);
  }
 }, []);

  return (
    <div className="bg-transparent overflow-hidden min-h-screen">

      <Navbar_Prim exploreRef={exploreRef}/>
      <Navbar />

      <Hero onRegisterClick={() => setOpen(true)} />

      <div className="relative">
        <div id="explore-section" className="gradient-03 z-0" ref={exploreRef} />
        {/* Smooth Top Fade for seamless transition from Hero - Reduced height to not cover heading */}
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#000029] to-transparent z-10 pointer-events-none" />
        <Explore />
      </div>

      <Feedback />
      <Sponsors />

      {/* ✅ FOOTER */}
      <Footer setOpen={setOpen} />
      
       {/* ✅ ROBOT ASSISTANT (ADDED HERE) */}
      <RobotAssistant />
       
      {/* ✅ GLOBAL MODAL - VECTOR PAD EVENT SELECTOR */}
      {open && (
        <VectorPad
          onSelectTechnical={() => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSeYCluNgFEkYtMb5uVdfotvmqKduGwDhof92pWDRueX-V_Plw/viewform?usp=header', '_blank');
            setOpen(false);
          }}
          onSelectNonTechnical={() => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLScTDNff49n1LQCitTSIFDPUSABn-FnItnwoSYN8ztqfFeOrbA/viewform?usp=header', '_blank');
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
};

export default Page;