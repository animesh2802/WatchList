import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryRow from '../components/CategoryRow';
import { getShowGenreCategory } from '../utils/tmdb';

const Shows = () => {
    const [genreRows, setGenreRows] = useState([]);

    const genres = [
        { id: 10765, label: "🚀 Sci-Fi & Fantasy" },
        { id: 10759, label: "🧨 Action & Adventure" },
        { id: 18, label: "🎭 Drama" },
        { id: 16, label: "🎨 Animation" },
        { id: 35, label: "😂 Comedy" },
        { id: 80, label: "🕵️ Crime" },
        { id: 99, label: "📽️ Documentary" },
        { id: 10751, label: "👨‍👩‍👧‍👦 Family" },
        { id: 10762, label: "🧒 Kids" },
        { id: 9648, label: "🕵️‍♂️ Mystery" },
        { id: 10763, label: "📰 News" },
        { id: 10764, label: "📺 Reality" },
        { id: 10766, label: "💋 Soap" },
        { id: 10767, label: "🎙️ Talk" },
        { id: 10768, label: "⚔️ War & Politics" },
        { id: 37, label: "🤠 Western" }

    ];

    useEffect(() => {
        const fetchShowGenres = async () => {
            try {
                const allGenreData = await Promise.all(
                    genres.map(g => getShowGenreCategory(g.id, g.label))
                );
                const rows = genres.map((g, idx) => ({
                    title: g.label,
                    items: allGenreData[idx]
                }));
                setGenreRows(rows);
            } catch (err) {
                console.error('Error fetching show genres:', err);
            }
        };

        fetchShowGenres();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">🎬 Shows by Genre</h1>
                {genreRows.map((row, idx) => (
                    <div key={idx} className="mb-6">
                        <CategoryRow title={row.title} items={row.items} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shows;
