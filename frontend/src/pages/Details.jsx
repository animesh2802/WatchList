import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { getDetailsById } from '../utils/tmdb';

const Details = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('📋 Link copied to clipboard!');
    };

    useEffect(() => {
        getDetailsById(id, item?.media_type || 'movie')
            .then((data) => setItem(data))
            .catch((err) => console.error('Failed to fetch details:', err));

        // Scroll event
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    if (!item) return <div className="text-white p-4">Loading...</div>;

    // Fade logic: 0 → visible, 300+px → fully black
    const fadeOpacity = Math.min(scrollY / 300, 1);

    console.log('Backdrop:', item.backdrop_path);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <section
                className="relative w-full h-[91vh] bg-cover bg-center flex items-end text-white"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90" />

                {/* Content */}
                <div className="relative z-10 px-12 py-20 max-w-4xl">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
                        {item.title || item.name}
                    </h1>

                    <p className="text-lg text-gray-300 mb-4 max-w-2xl drop-shadow-sm">
                        {item.overview}
                    </p>

                    {/* Info Row */}
                    <div className="flex gap-4 text-sm text-gray-400 mb-4">
                        <span>{item.release_date || item.first_air_date}</span>
                        <span>|</span>
                        <span>{item.vote_average.toFixed(1)}/10 ★</span>
                        <span>|</span>
                        <span>
                            {item.runtime
                                ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}min`
                                : item.episode_run_time?.[0]
                                    ? `${Math.floor(item.episode_run_time[0] / 60)}h ${item.episode_run_time[0] % 60}min`
                                    : 'N/A'}
                        </span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {item.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="px-3 py-1 bg-white/10 text-sm rounded-full border border-white/20"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {item.streaming ? (
                            <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full font-semibold">
                                ▶️ Watch on {item.streaming}
                            </button>
                        ) : (
                            <button disabled className="bg-gray-700 px-5 py-2 rounded-lg font-semibold opacity-70 cursor-not-allowed">
                                Not Still Available to Stream
                            </button>
                        )}

                        <div className="relative inline-block text-left">
                            <button
                                onClick={() => setShowDropdown((prev) => !prev)}
                                className="bg-gray-700/80 hover:bg-gray-600 px-4 py-2 rounded-full cursor-pointer transition"
                            >
                                +
                            </button>

                            {showDropdown && (
                                <div className="absolute bottom-12 left-0 mt-2 w-36 rounded-xl bg-zinc-800 shadow-lg border border-gray-600 z-50">
                                    <div className="py-2 flex flex-col">
                                        <button className="text-sm text-left px-3 py-1 hover:bg-gray-700 hover:text-white text-gray-300 rounded transition">
                                            ✔ Watched
                                        </button>
                                        <button className="text-sm text-left px-3 py-1 hover:bg-gray-700 hover:text-white text-gray-300 rounded transition">
                                            🎯 To Watch
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="bg-gray-700/80 hover:bg-gray-600 px-5 py-2 rounded-full cursor-pointer"
                            onClick={handleCopyLink}
                        >
                            🔗 Share
                        </button>
                        {item.trailerUrl && (
                            <button
                                onClick={() => window.open(item.trailerUrl, '_blank')}
                                className="bg-gray-700/80 hover:bg-gray-600 px-5 py-2 rounded-full cursor-pointer"
                            >
                                🎬 Watch Trailer
                            </button>
                        )}

                    </div>
                </div>
            </section>

            {/* 🎭 Cast Section */}
            {item.credits?.cast?.length > 0 && (
                <div className="px-8 py-6">
                    <h2 className="text-2xl font-bold mb-4">Cast 🎭</h2>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {item.credits.cast.slice(0, 12).map((actor) => (
                            <div
                                key={actor.id}
                                className="min-w-[120px] flex-shrink-0 text-center"
                            >
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : 'https://via.placeholder.com/185x278?text=No+Image'
                                    }
                                    alt={actor.name}
                                    className="rounded-lg w-full h-[180px] object-cover mb-2"
                                />
                                <h3 className="text-sm font-semibold text-white">{actor.name}</h3>
                                <p className="text-sm text-gray-400">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>

    );
};

export default Details;
