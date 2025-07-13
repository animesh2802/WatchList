// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='w-full h-16 backdrop-blur-md'>
            <nav className="w-full h-16 bg-zinc-900 flex items-center justify-between px-6 shadow-md text-white sticky">

                {/* Left: Logo */}
                <Link to="/" className="text-xl font-bold text-white hover:text-yellow-400 transition">
                    🎬 WatchList
                </Link>

                {/* Center: Navigation Buttons */}
                <div className="space-x-10 text-sm lg:text-lg ">
                    <Link to="/movies" className="hover:text-yellow-400 transition">Movies</Link>
                    <Link to="/shows" className="hover:text-yellow-400 transition">Shows</Link>
                    <Link to="/watched" className="hover:text-yellow-400 transition">Watched</Link>
                    <Link to="/to-watch" className="hover:text-yellow-400 transition">To-Watch</Link>
                </div>

                {/* Right: Profile Icon */}
                <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition">
                    <span className="text-sm font-bold">👤</span>
                </button>

            </nav>
        </div>
    );
};

export default Navbar;
