'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('product:product');

const Feature = require('./feature.js');

const Schema = mongoose.Schema;
const productSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  features: [{type: Schema.Types.ObjectId, ref: 'feature'}]
});

const Product = module.exports = mongoose.model('product', productSchema);

Product.findByIdAndAddFeat = function(id, feature){
  debug('findByIdAndAddFeat');
  return Product.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( product => {
      feature.productID = product._id;
      this.tempProduct = product;
      return new Feature(feature).save();
  })
  .then( feature => {
    this.tempProduct.features.push(feature._id);
    this.tempFeature = feature;
    return this.tempProduct.save();
  })
  .then( () => {
    return this.tempFeature;
  })
}
