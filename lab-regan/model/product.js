'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', productSchema);
