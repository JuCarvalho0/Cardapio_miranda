const mongoose = require('mongoose');
module.exports = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  unavailable: { type: Boolean, default: false },
}, { timestamps: true }));