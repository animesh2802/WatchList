import { getUserCountry } from './getUserCountry';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

let region = 'IN';

// Fetch region once at module init
(async () => {
    try {
        region = await getUserCountry();
        console.log("country: ", region);
    } catch (err) {
        console.error('Failed to fetch region:', err);
    }
})();

const safeFetch = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Failed to fetch:", url, err.message);
        return null;
    }
};

export const getDetailsById = async (id, media_type) => {
    const [details, credits, videos, reviews, providers] = await Promise.all([
        safeFetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`),
        safeFetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`),
        safeFetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`),
        safeFetch(`https://api.themoviedb.org/3/${media_type}/${id}/reviews?api_key=${API_KEY}&language=en-US`),
        safeFetch(`https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=${API_KEY}`)
    ]);

    if (!details) {
        throw new Error("Failed to fetch item details.");
    }

    const trailer = videos?.results?.find(
        v => v.site === 'YouTube' && v.type === 'Trailer' && v.official
    );

    const provider = providers?.results?.[region]?.flatrate?.[0]?.provider_name || null;

    return {
        ...details,
        credits, // full cast from dedicated endpoint
        reviews: reviews?.results || [],
        streaming: provider,
        trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
    };
};

export const getSeasonDetails = async (id, seasonNumber, media_type) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) throw new Error("Failed to fetch season details");
    return await response.json();
};


export const getTrendingMovies = async () => {

    const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&region=${region}`
    );
    const data = await res.json();
    return data.results.map(item => ({ ...item }));
};

export const getTrendingTV = async (numberOfPages = 2) => { // Added numberOfPages parameter
    const ANIMATION_GENRE_ID = 16;
    let allResults = [];

    for (let page = 1; page <= numberOfPages; page++) {
        const res = await fetch(
            `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}&region=${region}` // Added page parameter
        );
        const data = await res.json();

        // If there are no more pages, break the loop
        if (!data.results || data.results.length === 0) {
            break;
        }

        const filteredResults = data.results.filter(item => {
            return item.genre_ids && !item.genre_ids.includes(ANIMATION_GENRE_ID);
        });

        allResults = allResults.concat(filteredResults.map(item => ({ ...item })));
    }

    return allResults;
}


const fetchGenreItems = async (genreId, label, media_type, totalPages = 2, region) => {
    const promises = [];

    for (let page = 1; page <= totalPages; page++) {
        const url = `${BASE_URL}/discover/${media_type}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}&language=en-US&vote_count.gte=100&region=${region}`;
        promises.push(fetch(url).then(res => res.json()));
    }

    const results = await Promise.all(promises);

    // Flatten and tag each result with media_type
    return results
        .flatMap(data => data.results || [])
        .map(item => ({ ...item, genreLabel: label, media_type }));
};

export const getMovieGenreCategory = async (genreId, label) => {
    return await fetchGenreItems(genreId, label, 'movie', 2, region);
};

export const getShowGenreCategory = async (genreId, label) => {
    return await fetchGenreItems(genreId, label, 'tv', 2, region);
};

export const getGenreCategory = async (genreId, label, region) => {
    const [movies, shows] = await Promise.all([
        fetchGenreItems(genreId, label, 'movie', region),
        fetchGenreItems(genreId, label, 'tv', region)
    ]);
    return [...movies, ...shows];
};

// ✅ NEW: Mixed trending list for HeroCarousel
export const getMixedTrending = async (limit = 10) => {

    const [movies, shows] = await Promise.all([
        getTrendingMovies(region),
        getTrendingTV(region)
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

export const searchTMDB = async (query) => {
    const res = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    );
    const data = await res.json();
    return data.results.filter((item) => item.backdrop_path); // skip results without images
};


