import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/get-country', async (req, res) => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return res.json({ country: data.country || 'IN' }); // fallback to 'IN'
    } catch (error) {
        console.error('Error fetching country:', error);
        return res.status(500).json({ error: 'Failed to fetch country' });
    }
});

export default router;
