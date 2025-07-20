const IP_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;

export const getUserCountry = async () => {
    try {
        const res = await fetch(`https://api.ipinfo.io/lite/me?token=${IP_TOKEN}`);
        const data = await res.json();
        return data.country_code || 'IN';
    } catch (error) {
        console.error('Error fetching user country:', error);
        return 'IN'; // fallback to India if error
    }
};
