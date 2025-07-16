export const getUserCountry = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/utils/get-country`);
        const data = await res.json();
        return data.country || 'IN';
    } catch (error) {
        console.error('Error fetching user country:', error);
        return 'IN'; // fallback to India if error
    }
};
