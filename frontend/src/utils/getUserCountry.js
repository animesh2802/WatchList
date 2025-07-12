export const getUserCountry = async () => {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return data.country_code; // Example: "IN", "US", etc.
    } catch (error) {
        console.error('Error fetching user country:', error);
        return 'IN'; // fallback
    }
};
