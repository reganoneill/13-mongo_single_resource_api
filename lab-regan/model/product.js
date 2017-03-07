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
      // return new Feature(feature).save();
      let tempFeature = new Feature(feature).save();
      return tempFeature;
  })
  .then( feature => {
    this.tempProduct.features.push(feature._id);
    this.tempFeature = feature;
    return this.tempProduct.save();
  })
  .then( () => {
    return this.tempFeature;
  })
};//end findByIdAndAddFeat

Product.findByIdAndRemoveFeat = function(id, featureId){
  debug('findByIdAndRemoveFeat');
  return Product.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( product => {
    for(var i = 0; i <= product.features.length; i++){
      if(product.features[i] === featureId){
        debug('START');
        debug(product.features[i]);
        debug(featureId);
        product.features.splice(i, 1);
        return;
      };
    };
  });
};//end findByIdAndRemoveFeat
