import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const MediaCard = ({ item, index, onMarkWatched, onAddToWatch }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/details/${item.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            key={index}
            onClick={handleCardClick}
            className="snap-start group relative flex items-center transition-all delay-400 duration-240 ease-in-out min-w-[217px] h-[325px] hover:min-w-[450px] bg-zinc-900 rounded-lg overflow-hidden cursor-pointer"
        >
            {/* Poster Image */}
            <img
                src={`${IMAGE_BASE_URL}${item.poster_path}`}
                alt={item.title || item.name}
                className="h-full w-[217px] object-cover transition-all delay-400 duration-240 ease-in-out group-hover:w-[180px]"
            />

            {/* Hover Content */}
            <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between">
                <div className='hover:cursor-default'>
                    <h3 className="text-base font-semibold mb-1 text-white">
                        {item.title || item.name}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-6 mb-3">
                        {item.overview
                            ? item.overview.split(' ').slice(0, 40).join(' ') + '...'
                            : 'No summary available'}
                    </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                    <button
                        className="bg-green-500 text-black font-semibold py-1 px-2 rounded hover:bg-green-600 cursor-pointer hover:shadow-md transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onMarkWatched(item)
                        }}
                    >
                        Mark as Watched
                    </button>
                    <button
                        className="bg-yellow-400 text-black font-semibold py-1 px-2 rounded hover:bg-yellow-500 cursor-pointer hover:shadow-md transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToWatch(item);
                        }}
                    >
                        To-Watch
                    </button>
                </div>
            </div>

            {/* Dimming Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
};

export default MediaCard;
