import Item from '../models/Item.model.js';

//add items to a user's watched list
export const addItem = async (req, res) => {
    const { tmdbId, mediaType, status, notes } = req.body;
    const userId = req.user.id;

    try {
        //check if item already exists for user
        const existing = await Item.findOne({ tmdbId, mediaType, user: userId });
        if (existing) {
            return res.status(400).json({ message: 'Item already exists in your To-Watch List.' });
        }

        const newItem = new Item({
            tmdbId,
            mediaType,
            status: status || 'To-Watch',
            notes,
            user: userId,
        });

        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        console.error('Error adding items: ', err);
        res.status(500).json({ message: 'Server error' });
    }
};

//get all watchlist items for current user
export const getUserItems = async (req, res) => {
    const userId = req.user.id;
    const { status } = req.query; // optional ?status=Watched or To-Watch

    try {
        const filter = { user: userId };
        if (status) {
            filter.status = status;
        }

        const items = await Item.find(filter).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

//remove an item from a user's watchlist
export const deleteItem = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.user.id;

    try {
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await item.remove();
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

//update item status as watched or to-watch
export const updateItemStatus = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.user.id;
    const { status } = req.body;

    const validStatuses = ['Watched', 'To-Watch'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        item.status = status;
        await item.save();

        res.status(200).json(item);
    } catch (err) {
        console.error('Error updating item status:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
