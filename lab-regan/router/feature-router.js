'use strict';

const Router = require('express').Router;
const debug = require('debug')('product:feature-router');
const createError = require('http-errors');
const Promise = require('bluebird');
const jsonParser = require('body-parser').json();


const Product = require('../model/product.js');

const featureRouter = module.exports = new Router();


featureRouter.post('/api/product/:productID/feature', jsonParser, function(req, res, next){
  Product.findByIdAndAddFeat(req.params.productID, req.body)
  .then( feature => res.json(feature) )
  .catch(next);
});

featureRouter.get('/api/feature/:id', function(req, res, next){
  debug('GET: /api/feature/:id');
  Feature.findById(req.body.id)
  .then( feature => res.json(feature) )
  .catch(err => next(createError(404, err.message)));
});




// Create GET, √POST√, PUT, and DELETE routes for your newly added resource
