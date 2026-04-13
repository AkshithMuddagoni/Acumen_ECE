'use client';
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Skeleton loader to prevent jitter
const SkeletonLoader = ({ className }) => (
    <div className={`${className} bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse`} />
);

// Optimized MediaItem - No autoplay, only on hover
const MediaItem = ({ item, className, onClick, onHover }) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleMouseEnter = () => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.play().catch(e => console.log('Play prevented:', e));
            onHover?.(true);
        }
    };

    const handleMouseLeave = () => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            onHover?.(false);
        }
    };

    if (item.type === 'video') {
        return (
            <div 
                className={`${className} relative overflow-hidden bg-gray-900`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isLoading && <SkeletonLoader className="absolute inset-0" />}
                <video
                    ref={videoRef}
                    className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    onClick={onClick}
                    muted
                    playsInline
                    preload="none"
                    onLoadedData={() => setIsLoading(false)}
                    onError={() => { setHasError(true); setIsLoading(false); }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400">
                        <span className="text-xs">Video unavailable</span>
                    </div>
                )}
                {/* Play icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className} relative overflow-hidden bg-gray-900`}>
            {isLoading && <SkeletonLoader className="absolute inset-0" />}
            <img
                src={item.url}
                alt={item.title}
                className={`w-full h-full object-cover cursor-pointer ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onClick={onClick}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoading(false)}
                onError={() => { setHasError(true); setIsLoading(false); }}
            />
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400">
                    <span className="text-xs">Image not found</span>
                </div>
            )}
        </div>
    );
};

// Modal component
const MediaModal = ({ item, isOpen, onClose, allItems, currentIndex, setCurrentIndex }) => {
    if (!isOpen || !item) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? allItems.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === allItems.length - 1 ? 0 : prev + 1));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[80vh] flex flex-col"
            >
                {/* Media Display */}
                <div className="relative bg-black rounded-lg overflow-hidden flex-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={allItems[currentIndex].id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            <MediaItem
                                item={allItems[currentIndex]}
                                className="w-full h-full max-h-[70vh] object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Info */}
                <div className="bg-gray-900/80 backdrop-blur p-4 rounded-b-lg">
                    <h3 className="text-white font-semibold text-lg">{allItems[currentIndex].title}</h3>
                    <p className="text-gray-300 text-sm">{allItems[currentIndex].desc}</p>
                    <p className="text-gray-400 text-xs mt-2">{currentIndex + 1} / {allItems.length}</p>
                </div>

                {/* Navigation */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </motion.div>
    );
};


const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!mediaItems || mediaItems.length === 0) {
        return <div className="text-white text-center py-8">No gallery items</div>;
    }

    return (
        <div style={{ padding: '20px', width: '100%' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '40px', color: '#00bfff', marginBottom: '10px' }}>
                    {title}
                </h1>
                <p style={{ fontSize: '16px', color: '#999', marginBottom: '5px' }}>
                    {description}
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    {mediaItems.length} items
                </p>
            </div>

            {/* Simple Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '15px',
                width: '100%'
            }}>
                {mediaItems.slice(0, 20).map((item, index) => (
                    <div
                        key={item.id || index}
                        onClick={() => setSelectedIndex(index)}
                        style={{
                            backgroundColor: '#333',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            minHeight: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid #555'
                        }}
                    >
                        <div style={{ 
                            color: '#aaa', 
                            textAlign: 'center',
                            fontSize: '12px',
                            padding: '10px'
                        }}>
                            <div>{item.type === 'video' ? '🎬' : '📷'}</div>
                            <div style={{ marginTop: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', color: '#999', textAlign: 'center' }}>
                Showing first 20 of {mediaItems.length} items
            </div>
        </div>
    );
};

export default InteractiveBentoGallery;
