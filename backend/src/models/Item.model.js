// src/models/Item.model.js

import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    required: true,
  },
  status: {
    type: String,
    enum: ['To-Watch', 'Watched'],
    default: 'To-Watch',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
