// src/context/SearchContext.jsx
import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
    const [mediaType, setMediaType] = useState('multi');

    return (
        <SearchContext.Provider value={{ results, setResults, query, setQuery, mediaType, setMediaType }}>
            {children}
        </SearchContext.Provider>
    );
};
