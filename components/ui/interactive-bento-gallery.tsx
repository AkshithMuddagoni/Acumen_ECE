"use client"
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

interface MediaItemType {
    id: string | number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}

// Simple Modal
const GalleryModal = ({ item, isOpen, onClose, allItems, currentIndex, setCurrentIndex }) => {
    if (!isOpen || !item) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? allItems.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === allItems.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2" onClick={onClose}>
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10"
                >
                    ✕
                </button>

                {/* Media */}
                {item.type === 'video' ? (
                    <video
                        className="w-full h-full max-h-[80vh] object-contain rounded-lg"
                        controls
                        autoPlay
                        playsInline
                    >
                        <source src={item.url} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full max-h-[80vh] object-contain rounded-lg"
                    />
                )}

                {/* Nav Buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white bg-white/10 hover:bg-white/20 rounded-lg"
                >
                    ←
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white bg-white/10 hover:bg-white/20 rounded-lg"
                >
                    →
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                    {currentIndex + 1} / {allItems.length}
                </div>
            </div>
        </div>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-6 sm:mb-8 text-center">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {title}
                </h1>
                <p className="text-xs sm:text-base text-gray-400">
                    {description}
                </p>
            </div>

            {/* Simple Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-3">
                {mediaItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedIndex(index)}
                        className="relative overflow-hidden rounded-lg cursor-pointer bg-gray-900 aspect-square group"
                    >
                        {item.type === 'video' ? (
                            <>
                                <video
                                    className="w-full h-full object-cover"
                                    preload="metadata"
                                >
                                    <source src={item.url} type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                                    <span className="text-white text-2xl">▶</span>
                                </div>
                            </>
                        ) : (
                            <img
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:brightness-75 transition-all"
                                loading="lazy"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <GalleryModal
                        item={mediaItems[selectedIndex]}
                        isOpen={true}
                        onClose={() => setSelectedIndex(null)}
                        setSelectedIndex={setSelectedIndex}
                        mediaItems={mediaItems}
                        currentIndex={selectedIndex}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
