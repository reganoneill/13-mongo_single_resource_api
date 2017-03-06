'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product.js');

const featureSchema = Schema({
  name: {type: String, required: true},
  productID: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('feature', featureSchema);
