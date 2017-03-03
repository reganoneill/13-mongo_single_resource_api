'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('product:product-router');

const Product = require('../model/product.js');
const productRouter = module.exports = new Router();

productRouter.post('/api/product', jsonParser, function(req, res, next){
  debug('POST: /api/product');
  if(!req.body.name){
    debug('Throw 400 Bad Request');
    return Promise.reject(createError(400, 'Bad Request SO BAD.'))
    .then(next)
    .catch(next);
  };
  req.body.timestamp = new Date();
  new Product(req.body).save()
  .then( product => res.json(product))
  .catch(next);
});//end post
productRouter.get('/api/product/:id', function(req, res, next){
  debug('GET: /api/product/:id');
  Product.findById(req.params.id)
  .then( product => res.json(product))
  .catch(next => {
    res.status(404).send('Not Found');
    next;
  });
});//end get
productRouter.put('/api/product/:id/:name', jsonParser, function(req, res, next){
  debug('PUT: /api/product/:id/:name');
  Product.findByIdAndUpdate(req.params.id, { $set: {name: req.params.name}}, {new:true})
  .then( product => res.json(product))
  .catch(next);
});//end put
productRouter.delete('/api/product/:id', function(req, res, next){
  debug('DELETE: /api/product/:id');
  Product.findByIdAndRemove(req.params.id)
  .then( removed => res.json(removed))
  .catch(next);
});//end delete
