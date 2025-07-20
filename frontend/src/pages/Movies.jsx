import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryRow from '../components/CategoryRow';
import { getMovieGenreCategory } from '../utils/tmdb';

const Movies = () => {
    const [genreRows, setGenreRows] = useState([]);

    const genres = [
        { id: 878, label: '🚀 Sci-Fi' },
        { id: 28, label: '🧨 Action' },
        { id: 27, label: '😱 Horror' },
        { id: 12, label: '🧭 Adventure' },
        { id: '9648,53', label: '🕵️ Mystery & Thriller' },
        { id: 80, label: '🕵️ Crime' },
        { id: 10751, label: '👨‍👩‍👧‍👦 Family' },
        { id: 36, label: '🏰 History' },
        { id: 35, label: '😂 Comedy' },
        { id: 18, label: '🎭 Drama' },
        { id: 10749, label: '❤️ Romance' },

        { id: 16, label: '🎨 Animation' },
        { id: 99, label: '🎬 Documentary' },
        { id: 14, label: '🧚 Fantasy' },
        { id: 10402, label: '🎵 Music' },
        { id: 10770, label: '📺 TV Movie' },
        { id: 10752, label: '⚔️ War' },
        { id: 37, label: '🤠 Western' },

    ];

    useEffect(() => {
        const fetchMovieGenres = async () => {
            try {
                const allGenreData = await Promise.all(
                    genres.map(g => getMovieGenreCategory(g.id, g.label))
                );
                const rows = genres.map((g, idx) => ({
                    title: g.label,
                    items: allGenreData[idx]
                }));
                setGenreRows(rows);
            } catch (err) {
                console.error('Error fetching movie genres:', err);
            }
        };

        fetchMovieGenres();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">🎬 Movies by Genre</h1>
                {genreRows.map((row, idx) => (
                    <div key={idx} className="mb-6">
                        <CategoryRow title={row.title} items={row.items} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
