import { useRef, useState } from 'react';
import { Footer, Navbar, Navbar_Prim, Sponsors } from '../components';
import { Explore, Feedback, Hero } from '../sections';

const Page = () => {
  const exploreRef = useRef(null);

  // ✅ GLOBAL STATE
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-transparent overflow-hidden min-h-screen">

      <Navbar_Prim exploreRef={exploreRef}/>
      <Navbar />

      {/* ✅ HERO */}
      <Hero open={open} setOpen={setOpen} />

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

      {/* ✅ GLOBAL MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-[#000029] p-8 rounded-2xl text-center w-[300px] shadow-lg">

            <h2 className="text-white text-xl mb-6">
              Choose Event Type
            </h2>

            {/* Technical */}
            <a
              href="https://forms.gle/YOUR_TECH_FORM"
              target="_ blank"
            >
              <button className="w-full mb-4 p-3 rounded-lg bg-gradient-to-r from-[#008080] to-[#3A3335] text-white">
                Technical Events
              </button>
            </a>

            {/* Non Technical */}
            <a
              href="https://forms.gle/YOUR_NONTECH_FORM"
              target="_ blank"
            >
              <button className="w-full p-3 rounded-lg bg-gradient-to-r from-[#3A3335] to-[#008080] text-white">
                Non-Technical Events
              </button>
            </a>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-gray-400 text-sm"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Page;