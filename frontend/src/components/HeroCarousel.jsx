import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const HeroCarousel = ({ items }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const intervalRef = useRef();

    useEffect(() => {
        if (!items || items.length === 0) return;

        intervalRef.current = setInterval(() => {
            if (!isPaused) {
                setIndex((prev) => (prev + 1) % items.length);
            }
        }, 6000);

        return () => clearInterval(intervalRef.current);
    }, [isPaused, items]);

    if (!items || items.length === 0) return null;

    const currentItem = items[index % items.length];

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % items.length);
    };

    const handleDotClick = (i) => {
        setIndex(i);
    };

    const handleCardClick = () => {
        navigate(`/details/${currentItem.id}`);
    };

    const handleMoreInfo = (e, item) => {
        e.stopPropagation(); // 🛑 Prevent bubbling
        navigate(`/details/${item.id}`);
    };

    const toggleSummary = (e) => {
        e.stopPropagation(); // 🛑 Prevent accidental banner click
        setIsExpanded((prev) => !prev);
    };


    return (
        <div
            className="relative w-full h-[70vh] md:h-[78vh] overflow-hidden mb-8 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentItem.id}
                    src={`${IMAGE_BASE_URL}${currentItem.backdrop_path}`}
                    alt={currentItem.title || currentItem.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover absolute inset-0 cursor-pointer"
                    onClick={handleCardClick}
                />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 z-10 cursor-pointer" />

            {/* Banner Content */}
            <div className="absolute bottom-10 left-5 md:left-10 text-white max-w-xl space-y-3 z-20 ">
                <h1 className="text-3xl md:text-5xl font-bold">
                    {currentItem.title || currentItem.name}
                </h1>
                <p className="text-sm md:text-base text-gray-200 line-clamp-3" onClick={toggleSummary}>
                    {isExpanded
                        ? currentItem.overview
                        : currentItem.overview?.split(' ').slice(0, 20).join(' ') + '...'}
                </p>
                <div className="flex gap-3 mt-4">
                    <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition">
                        ▶ Play
                    </button>
                    <button className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition" onClick={(e)=>handleMoreInfo(e, currentItem)}>
                        ℹ More Info
                    </button>
                </div>
            </div>

            {/* Left Button */}
            <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 text-5xl text-white bg-black/10 hover:bg-black/30 rounded-4xl px-3 py-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
            >
                ‹
            </button>

            {/* Right Button */}
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 text-5xl text-white bg-black/10 hover:bg-black/30 rounded-4xl px-3 py-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
            >
                ›
            </button>

            {/* Slide Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                {items.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${i === index ? 'bg-white scale-125' : 'bg-gray-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
