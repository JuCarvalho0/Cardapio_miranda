const mongoose = require('mongoose');
module.exports = mongoose.model('Category', new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true }));