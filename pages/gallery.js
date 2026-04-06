import { Footer, Navbar_Prim } from '../components';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Gallery = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const galleryItems = [
    {
      type: 'image',
      src: '/2024event_pic1.jpg',
      title: 'Robo sumo',
      // description: 'Event Highlights'
    },
    {
      type: 'image',
      src: '/2024event_pic2.jpg',
      title: 'Inspire and Ignite',
      // description: 'Event Moments'
    },

    {
      type: 'image',
      src: '/2024event_pic4.jpg',
      title: 'Robo Soccer',
      // description: 'Event Activities'
    },
    {
      type: 'image',
      src: '/2024event_pic5.jpg',
      title: 'Robo Soccer',
      // description: 'Event Celebrations'
    },
    {
      type: 'image',
      src: '/2024event_pic6.jpg',
      title: 'Tug Of War',
      // description: 'Technical Showcase'
    },
    {
      type: 'image',
      src: '/2024event_pic7.jpg',
      title: 'Tug of War',
      // description: 'Innovation Display'
    },
    {
      type: 'image',
      src: '/2024event_pic8.jpg',
      title: 'Project Expo',
      // description: 'Project Presentations'
    },
    {
      type: 'image',
      src: '/2024event_pic9.jpg',
      title: 'Inspire and Ignite',
      // description: 'Event Excellence'
    },
    {
      type: 'image',
      src: '/2024_fox.jpg',
      title: 'Fox Hunt',
      // description: 'Event Excellence'
    },
    {
      type: 'image',
      src: '/2024_industrize.jpg',
      title: 'Industrize',
      // description: 'Event Excellence'
    },
    {
      type: 'image',
      src: '/2024_poster_and_paper.jpg',
      title: 'Paper and Poster Presentation',
      // description: 'Event Excellence'
    },
    {
      type: 'image',
      src: '/2024_inspire.jpg',
      title: 'Inspire and Ignite',
      // description: 'Event Excellence'
    }
  ];

  const VideoPlayer = () => {
    const videoRef = React.useRef(null);

    if (!isClient) {
      return (
        <div className="w-full aspect-video bg-gray-900 rounded-xl animate-pulse"></div>
      );
    }

    return (
      <div className="relative group">
        <video 
          ref={videoRef}
          autoPlay 
          loop
          muted
          playsInline
          className="w-full rounded-xl transform transition-transform duration-700 group-hover:scale-105"
          preload="auto"
        >
          <source src="/2024event_video1.mp4" type="video/mp4" />
        </video>
        {/* */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
        
        {/*  */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-6 pb-0 md:pb-6 text-white transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-[#00c6ff] text-xl md:text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-500
            group-hover:text-[#40e0ff] drop-shadow-[0_0_8px_rgba(0,198,255,0.5)]">
            RC Racing
          </h3>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-transparent overflow-hidden">
      <Navbar_Prim />
      
      {/* Background with animated gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-black pointer-events-none animate-gradient"></div>
      
      <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

          {/* Header Section */}
          <div className="relative mb-16 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-[90px] font-anta bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#0040ff] text-transparent bg-clip-text gradient-move animate-fade-in-down mb-6">
              Event Gallery
            </h1>
            <p className="text-[#8892b0] text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up transform transition-all duration-700 delay-300">
              Explore our diverse range of technical and cultural events that make Acumen ECE unique.
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
              <VideoPlayer />
            </div>
          </div>

          {/* Masonry Grid */}
          {/* Masonry Grid with Fixed Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                className="group rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20
                animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-full h-full relative">
                  <div 
                    className="w-full h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.src})` }}
                  >
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    {/* Content with enhanced animations */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-[#00c6ff] text-xl md:text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-500
                        group-hover:text-[#40e0ff] drop-shadow-[0_0_8px_rgba(0,198,255,0.5)]">
                        {item.title}
                      </h3>
                      <p className="text-[#8892b0] text-sm md:text-base opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100
                        transform md:translate-y-4 md:group-hover:translate-y-0">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.description}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 400% 400%;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default Gallery; 