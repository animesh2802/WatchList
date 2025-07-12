// src/pages/Details.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailsById } from '../utils/tmdb';

const Details = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        getDetailsById(id)
            .then((data) => setItem(data))
            .catch((err) => console.error("Failed to fetch details:", err));
    }, [id]);

    if (!item) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-4">
                {item.title || item.name}
            </h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-[300px] rounded mb-4"
            />
            <p className="text-lg text-gray-300">{item.overview}</p>
            <p className="mt-2 text-sm text-gray-500">
                Rating: {item.vote_average} | Release: {item.release_date || item.first_air_date}
            </p>
        </div>
    );
};

export default Details;
