'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Product = require('../model/product.js');
const debug = require('debug')('product:product-router');


const productRouter = module.exports = new Router();

productRouter.post('/api/product', jsonParser, function(req, res, next){
  debug('POST: /api/product');
  req.body.timestamp = new Date();
  new Product(req.body).save()
  .then( product => res.json(product))
  .catch(next);
});//end post

productRouter.get('/api/product/:id', function(req, res, next){
  debug('GET: /api/product/:id');
  Product.findById(req.params.id)
  .then( product => res.json(product))
  .catch(next);
});

productRouter.put('/api/product/:id/:name', jsonParser, function(req, res, next){
  debug('PUT: /api/product/:id/:name');
  Product.findByIdAndUpdate(req.params.id, { $set: {name: req.params.name}}, {new:true})
  .then( product => res.json(product))
  .catch(next);
});

productRouter.delete('/api/product/:id', function(req, res, next){
  debug('DELETE: /api/product/:id');
  Product.findByIdAndRemove(req.params.id)
  .then( removed => res.json(removed))
  .catch(next);
});
