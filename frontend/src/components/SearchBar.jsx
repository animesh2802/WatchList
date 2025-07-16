import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length === 0) {
                setResults([]);
                return;
            }

            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`);
            const data = await res.json();
            setResults(data.results || []);
        };

        const timeout = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="relative z-50">
            <input
                type="text"
                className="px-3 py-1 bg-zinc-600 h-[1/2] text-white text-sm rounded-full"
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
            />

            {showDropdown && results.length > 0 && (
                <div className="absolute left-0 top-10 w-80 max-h-96 overflow-auto bg-zinc-900 shadow-lg rounded-md p-2 space-y-2 z-50">
                    {results.slice(0, 6).map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                navigate(`/details/${item.media_type}/${item.id}`);
                                setQuery('');
                                setShowDropdown(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded hover:bg-zinc-800 transition cursor-pointer"
                        >
                            <img
                                src={
                                    item.poster_path
                                        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                        : '/no-image.png' // put this file in your `public/` folder
                                }
                                alt={item.title || item.name}
                                className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                                <p className="text-white font-medium text-sm">
                                    {item.title || item.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.release_date || item.first_air_date || 'N/A'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default SearchBar;