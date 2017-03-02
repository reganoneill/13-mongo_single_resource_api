'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('product:product-route-test');

const PORT = process.env.PORT || 3000;
const Product = require('../model/product.js');

process.env.MONGODB_URI = 'mongodb://localhost/whatever';
