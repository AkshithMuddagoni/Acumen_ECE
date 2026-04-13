import { useRef, useEffect } from 'react';
import { Sponsors } from '../components';
import { Explore, Feedback, Hero } from '../sections';

const Page = ({ setOpen }) => {
  const exploreRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const register = params.get('register');

    if (register === 'true') {
      setOpen(true);
    }
  }, [setOpen]);

  return (
    <div className="bg-transparent overflow-hidden">
      <Hero onRegisterClick={() => setOpen(true)} />

      <div className="relative">
        <div id="explore-section" className="gradient-03 z-0" ref={exploreRef} />
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#000029] to-transparent z-10 pointer-events-none" />
        <div id="explore-section"><Explore /></div>
      </div>

      <Feedback />
      <Sponsors />
    </div>
  );
};

export default Page;