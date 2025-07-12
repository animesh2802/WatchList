import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import CategoryRow from '../components/CategoryRow';
import { getUserCountry } from '../utils/getUserCountry';
import { getTrendingMovies, getTrendingTV, getGenreCategory, getMixedTrending } from '../utils/tmdb';

const Home = () => {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [genreRows, setGenreRows] = useState([]);
    const [heroItems, setHeroItems] = useState([]);

    const genres = [
        { id: 878, label: '🚀 Sci-Fi' },
        { id: 28, label: '🧨 Action' },
        { id: '9648,53', label: '🕵️ Mystery & Thriller' }, // combining 2 genres
        { id: 27, label: '😱 Horror' },
        { id: 35, label: '😂 Comedy' },
        { id: 18, label: '🎭 Drama' },
        { id: 10749, label: '❤️ Romance' }
    ];

    useEffect(() => {
        const fetchAll = async () => {
            const region = await getUserCountry(); // e.g., "IN"
            console.log(region);

            try {
                const [movies, tv, mixed] = await Promise.all([
                    getTrendingMovies(region),
                    getTrendingTV(region),
                    getMixedTrending(10, region)
                ]);

                setTrendingMovies(movies);
                setTrendingTV(tv);
                setHeroItems(mixed);
            } catch (err) {
                console.error('Error fetching trending content:', err);
            }

            try {
                const allGenreData = await Promise.all(
                    genres.map(g => getGenreCategory(g.id, g.label, region))
                );
                const rows = genres.map((g, idx) => ({
                    title: g.label,
                    items: allGenreData[idx]
                }));
                setGenreRows(rows);
            } catch (err) {
                console.error('Error fetching genre rows:', err);
            }
        };

        fetchAll();
    }, []);


    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <HeroCarousel items={heroItems} />

            <div className="p-6">
                <CategoryRow
                    title="🔥 Trending Movies 🎬"
                    items={trendingMovies}
                />
            </div>
            <div className="p-6">
                <CategoryRow
                    title="🔥 Trending Shows 📺"
                    items={trendingTV}
                />
            </div>
            {genreRows.map((row, idx) => (
                <div key={idx} className="p-6">
                    <CategoryRow title={row.title} items={row.items} />
                </div>
            ))}
        </div>
    );
};

export default Home;