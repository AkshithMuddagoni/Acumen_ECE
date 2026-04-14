import { Navbar, Navbar_Prim } from '../components';
import { About5, Explore5, Feedback, GetStarted5, Hero5 } from '../sections';
import React from 'react'

const TechnicalEvents = () => {
  const videoRef = React.useRef(null);
  const [isLooping, setIsLooping] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback rate to 0.8x (slowed down)
    video.playbackRate = 0.8;

    // Autoplay the video
    video.play().catch(err => console.log('Autoplay prevented:', err));

    const handleEnded = () => {
      // 2 second gap before looping
      setIsLooping(true);
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(err => console.log('Replay prevented:', err));
        setIsLooping(false);
      }, 2000);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
  <div className="bg-transparent overflow-hidden">
    <Navbar_Prim />
    <div className="gradient-01 z-0" />
    <div className="relative h-screen flex flex-col justify-center items-center p-5 overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <source src="/nontechbg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Hero Content */}
      <div className="relative z-10">
        <Hero5 />
      </div>
    </div>
    <div className="relative">

      <div className="gradient-08 z-0" />
      <Explore5 />

 
    </div>
    {/* <div className="relative">
      <Feedback />
      <div className="gradient-04 z-0" />
    </div> */}
  </div>
);
}

export default TechnicalEvents