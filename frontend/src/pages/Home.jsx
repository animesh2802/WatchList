import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import CategoryRow from '../components/CategoryRow';
import { getTrendingMovies, getTrendingTV, getGenreCategory, getMixedTrending } from '../utils/tmdb';
//import { getUserCountry } from '../utils/getUserCountry';

const Home = () => {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [genreRows, setGenreRows] = useState([]);
    const [heroItems, setHeroItems] = useState([]);
    const [region, setRegion] = useState('IN');

    const genres = [
        { id: 878, label: '🚀 Sci-Fi' },
        { id: 27, label: '😱 Horror' },
        { id: 28, label: '🧨 Action' },
        { id: '9648,53', label: '🕵️ Mystery & Thriller' }, // combining 2 genres
        { id: 35, label: '😂 Comedy' },
        { id: 18, label: '🎭 Drama' },
        //{ id: 10749, label: '❤️ Romance' }
    ];

    useEffect(() => {
        const fetchAll = async () => {

            try {
                setRegion();

                const [movies, tv, mixed] = await Promise.all([
                    getTrendingMovies(),
                    getTrendingTV(),
                    getMixedTrending(10)
                ]);

                setTrendingMovies(movies);
                setTrendingTV(tv);
                setHeroItems(mixed);
            } catch (err) {
                console.error('Error fetching trending content:', err);
            }

            try {
                const allGenreData = await Promise.all(
                    genres.map(g => getGenreCategory(g.id, g.label))
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

            {/* enable the below hero carousel to get Prime video and netflix like homepage */}
            {/*<HeroCarousel items={heroItems} />*/}

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