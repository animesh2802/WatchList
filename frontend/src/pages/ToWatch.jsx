// src/pages/ToWatch.jsx

import React from 'react';
import Navbar from '../components/Navbar';

const ToWatch = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold">To-Watch List</h1>
            </div>
        </div>
    );
};

export default ToWatch;
