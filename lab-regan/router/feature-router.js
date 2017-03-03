'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('product:feature-router');

const Feature = require('../model/feature.js');
const Product = require('../model/product.js');

const featureRouter = module.exports = new Router();


featureRouter.post('/api/product/:productID/feature', jsonParser, function(req, res, next){
  Product.findByIdAndAddFeat(req.params.productID, req.body)
  .then( feature => res.json(feature) )
  .catch(next);
});//end post

featureRouter.get('/api/feature/:id', function(req, res, next){
  debug('GET: /api/feature/:id');
  Feature.findById(req.body.id)
  .then( feature => res.json(feature) )
  .catch(err => next(createError(404, err.message)));
});//end get

featureRouter.put('/api/feature/:id/:name', jsonParser, function(req, res, next){
  debug('PUT: /api/feature/:id/:name');
  Feature.findByIdAndUpdate(req.params.id, {$set: {req.params.name} }, {new: true})
  .then( new => res.json(new))
  .catch(next);
});//end put

featureRouter.delete('/api/feature/:id', jsonParser, function(req, res, next){
  debug('DELETE: /api/feature/:id');
  Feature.findByIdAndRemove(req.params.id)
  .then( new => res.json(new))
  .catch(next);
});//end put



// Create GET, √POST√, PUT, and DELETE routes for your newly added resource
