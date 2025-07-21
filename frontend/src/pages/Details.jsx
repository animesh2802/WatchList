import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { getDetailsById, getSeasonDetails } from '../utils/tmdb';

const Details = () => {
    const { id, media_type } = useParams();
    const [item, setItem] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [seasonDetails, setSeasonDetails] = useState(null);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('📋 Link copied to clipboard!');
    };

    useEffect(() => {
        if (item?.seasons?.length > 0) {
            setSelectedSeason(displayItem.seasons[0].season_number);
        }
    }, [item]);

    useEffect(() => {
        getDetailsById(id, media_type)
            .then((data) => setItem(data))
            .catch((err) => console.error('Failed to fetch details:', err));

        // Scroll event
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id, media_type]);

    useEffect(() => {
        if (media_type === 'tv' && selectedSeason) {
            // OPTIONAL: navigate to a different route or fetch season details
            // e.g., navigate(`/tv/${id}/season/${selectedSeason}`);
            // OR: fetch and display season-specific info below
            console.log(`Selected season ${selectedSeason}`);
        }
    }, [selectedSeason]);

    useEffect(() => {
        const fetchSeason = async () => {
            if (media_type === "tv") {
                const details = await getSeasonDetails(id, selectedSeason);
                setSeasonDetails(details);
            }
        };

        fetchSeason();
    }, [selectedSeason, id, media_type]);


    if (!item) return <div className="text-white p-4">Loading...</div>;


    const displayItem = media_type === 'tv' && seasonDetails ? {
        ...item,
        overview: seasonDetails.overview || item.overview,
        poster_path: seasonDetails.poster_path || item.poster_path,
        backdrop_path: seasonDetails.backdrop_path || item.backdrop_path,
        air_date: seasonDetails.air_date || item.first_air_date,
    } : item;

    // Fade logic: 0 → visible, 300+px → fully black
    const fadeOpacity = Math.min(scrollY / 300, 1);

    //console.log('Backdrop:', displayItem.backdrop_path);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <section
                className="relative w-full h-[91vh] bg-cover bg-center flex items-end text-white"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${displayItem.backdrop_path})`,
                }}
            >
                {/* Overlay: Gradient now starts from bottom-left and fades to top-right */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent" />

                {/* Content: Unchanged */}
                <div className="relative z-10 px-12 py-20 max-w-4xl">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                        {displayItem.title || displayItem.name}
                    </h1>

                    <p className="text-lg text-gray-200 mb-4 max-w-2xl drop-shadow-md">
                        {displayItem.overview}
                    </p>

                    {/* Info Row */}
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-4 drop-shadow-md">
                        <span>{displayItem.release_date || displayItem.first_air_date}</span>
                        <span className="opacity-50">|</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-yellow-400">★</span>
                            {displayItem.vote_average.toFixed(1)}/10
                        </span>
                        <span className="opacity-50">|</span>
                        {media_type === 'tv' ? (
                            <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">
                                    {displayItem.number_of_seasons} Season{displayItem.number_of_seasons > 1 ? 's' : ''} 📺
                                </span>
                                {/* season selector 👇🏻 */}
                                {/*<select
                                    value={selectedSeason}
                                    onChange={(e) => setSelectedSeason(e.target.value)}
                                    className="bg-gray-800 text-white px-2 py-1 ml-5 rounded cursor-pointer"
                                >
                                    {displayItem.seasons.map((season) => (
                                        <option key={season.id} value={season.season_number}>
                                            {season.name}
                                        </option>
                                    ))}
                                </select>*/}
                            </div>
                        ) : (
                            <span>
                                {displaydisplayItem.runtime
                                    ? `${Math.floor(displayItem.runtime / 60)}h ${displayItem.runtime % 60}min`
                                    : displayItem.episode_run_time?.[0]
                                        ? `${Math.floor(displayItem.episode_run_time[0] / 60)}h ${displayItem.episode_run_time[0] % 60}min`
                                        : 'N/A'}
                            </span>
                        )}
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {displayItem.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="px-3 py-1 bg-white/10 text-sm rounded-full border border-white/20 backdrop-blur-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons (Unchanged) */}
                    <div className="flex gap-3">
                        {displayItem.streaming ? (
                            <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full font-semibold">
                                ▶️ Watch on {displayItem.streaming}
                            </button>
                        ) : (
                            <button disabled className="bg-gray-700 px-5 py-2 rounded-lg font-semibold opacity-70 cursor-not-allowed">
                                Still Not Available to Stream
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
                        {displayItem.trailerUrl && (
                            <button
                                onClick={() => window.open(displayItem.trailerUrl, '_blank')}
                                className="bg-gray-700/80 hover:bg-gray-600 px-5 py-2 rounded-full cursor-pointer"
                            >
                                🎬 Watch Trailer
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* 🎭 Cast Section */}
            {displayItem.credits?.cast?.length > 0 && (
                <div className="px-8 py-6">
                    <h2 className="text-2xl font-bold mb-4">Cast 🎭</h2>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {displayItem.credits.cast.slice(0, 20).map((actor) => (
                            <div
                                key={actor.id}
                                className="min-w-[120px] flex-shrink-0 text-center"
                            >
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : '/images/no_dp.webp'
                                    }
                                    alt={actor.name}
                                    onError={(e) => {
                                        if (e.currentTarget.src !== window.location.origin + '/images/no_dp.webp') {
                                            e.currentTarget.src = '/images/no_dp.webp';
                                        }
                                    }}
                                    className="rounded-lg w-full h-[180px] object-cover mb-2"
                                />
                                <h3 className="text-sm font-semibold text-white line-clamp-1">{actor.name}</h3>
                                <p className="text-sm text-gray-400 line-clamp-1">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}



        </div>

    );
};

export default Details;