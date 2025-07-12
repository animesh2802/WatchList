// src/pages/Movies.jsx

import React from 'react';
import Navbar from '../components/Navbar';

const Movies = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Movies Page</h1>
            </div>
        </div>
    );
};

export default Movies;
