// src/components/CategoryRow.jsx

import React, { useRef } from 'react';
import MediaCard from './MediaCard';

const CategoryRow = ({ title, items }) => {

    const scrollRef = useRef(null);
    // Placeholder functions for now — to be connected to backend later
    const handleMarkWatched = (item) => {
        console.log('Mark as Watched:', item.title || item.name);
    };

    const handleAddToWatch = (item) => {
        console.log('Add to To-Watch:', item.title || item.name);
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 px-2">{title}</h2>
            {/* Scroll Buttons */}
            <button
                onClick={() => scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })}
                className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-black to-transparent text-white text-2xl opacity-0 group-hover:opacity-100 transition"
            >
                ⇦
            </button>
            <button
                onClick={() => scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })}
                className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-black to-transparent text-white text-2xl opacity-0 group-hover:opacity-100 transition"
            >
                ⇨
            </button>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 px-2 pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory">
                {items.map((item, index) => (
                    <MediaCard
                        key={index}
                        index={index}
                        item={item}
                        onMarkWatched={handleMarkWatched}
                        onAddToWatch={handleAddToWatch}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryRow;
