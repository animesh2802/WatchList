import express from 'express';
import {addItem, getUserItems, deleteItem, updateItemStatus} from '../controllers/item.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addItem);
router.get('/', verifyToken, getUserItems);
router.delete('/:id', verifyToken, deleteItem);
router.patch('/:id', verifyToken, updateItemStatus);

export default router;