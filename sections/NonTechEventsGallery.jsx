import { useState, useEffect } from 'react';
import { CircularGallery } from '@/components/ui/circular-gallery-2';
import { exploreWorlds5 } from '@/constants';

export const NonTechEventsGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    // Transform the exploreWorlds5 array into gallery items with images and text
    const items = exploreWorlds5.map((event) => ({
      image: event.Poster,
      text: event.title,
    }));
    setGalleryItems(items);
  }, []);

  return (
    <div className="w-full">
      {/* Gallery Container */}
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gradient-to-b from-[#000029] to-[#1a1a3d]">
        <CircularGallery
          items={galleryItems}
          bend={3}
          borderRadius={0.05}
          scrollEase={0.02}
          className="w-full h-full"
        />
      </div>

      {/* Event Info & Description Below */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exploreWorlds5.map((event) => (
          <div
            key={event.id}
            className="group p-6 rounded-xl bg-gradient-to-br from-[#1a1a3d] to-[#0f0f25] border border-[#00ffaa]/10 hover:border-[#00ffaa]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,170,0.2)]"
          >
            {/* Event Image */}
            <div className="mb-4 h-40 rounded-lg overflow-hidden">
              <img
                src={event.Poster}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Event Title */}
            <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>

            {/* Event Description */}
            <p className="text-sm text-[#b0b0d9] leading-relaxed mb-4">
              {event.subtitle}
            </p>

            {/* Register Button */}
            <button
              onClick={() => {
                window.location.href = `https://forms.gle/yourFormLink?event=${event.id}`;
              }}
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#000029] font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,255,170,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </button>
          </div>
        ))}
      </div>

      {/* Scroll Instructions */}
      <div className="text-center mt-8 text-[#b0b0d9] text-sm">
        <p>💡 Scroll or drag to explore events • Click an event to register</p>
      </div>
    </div>
  );
};

export default NonTechEventsGallery;
