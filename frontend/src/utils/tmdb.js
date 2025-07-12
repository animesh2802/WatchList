// src/utils/tmdb.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetch TMDB data from any endpoint
 */
async function fetchFromTMDB(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', API_KEY);

    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`TMDB fetch failed: ${response.status}`);
    return await response.json();
}

/**
 * Get trending content
 */
export const getTrending = (mediaType = 'all', timeWindow = 'day') => {
    return fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`);
};

/**
 * Get top rated movies or shows
 */
export const getTopRated = (mediaType = 'movie') => {
    return fetchFromTMDB(`/${mediaType}/top_rated`);
};

/**
 * Get movie or show details
 */
export const getDetails = (mediaType, id) => {
    return fetchFromTMDB(`/${mediaType}/${id}`);
};

/**
 * Get popular content
 */
export const getPopular = (mediaType = 'movie') => {
    return fetchFromTMDB(`/${mediaType}/popular`);
};

export const getDetailsById = async (id) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error('Failed to fetch TMDB details');
    return await res.json();
};

export const getTrendingMovies = async (region) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results.map(item => ({ ...item, media_type: 'movie' }));
};

export const getTrendingTV = async (region) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results.map(item => ({ ...item, media_type: 'tv' }));
};


const fetchGenreItems = async (genreId, label, type, totalPages = 2, region) => {
    const promises = [];

    for (let page = 1; page <= totalPages; page++) {
        const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}&language=en-US&vote_count.gte=100`;
        promises.push(fetch(url).then(res => res.json()));
    }

    const results = await Promise.all(promises);

    // Flatten and tag each result with media_type
    return results
        .flatMap(data => data.results || [])
        .map(item => ({ ...item, media_type: type, genreLabel: label }));
};

export const getGenreCategory = async (genreId, label, region) => {
    const [movies, shows] = await Promise.all([
        fetchGenreItems(genreId, label, 'movie'),
        fetchGenreItems(genreId, label, 'tv')
    ]);
    return [...movies, ...shows];
};

// ✅ NEW: Mixed trending list for HeroCarousel
export const getMixedTrending = async (limit = 10, region) => {
    const [movies, shows] = await Promise.all([
        getTrendingMovies(),
        getTrendingTV()
    ]);

    const combined = [...(movies || []), ...(shows || [])];

    // ✅ Apply filters
    const filtered = combined.filter(
        (item) =>
            item.backdrop_path &&                          // must have image
            item.original_language === 'en' &&             // English content only
            item.adult !== true
    );

    const top = filtered
        .sort((a, b) => b.popularity - a.popularity)     // sort by popularity
        .slice(0, limit);                                 // top N

    return top;
};
