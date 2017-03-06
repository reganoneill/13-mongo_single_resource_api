'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('product:feature-route-test');

const PORT = process.env.PORT || 3000;
const Product = require('../model/product.js');
const Feature = require('../model/feature.js');

process.env.MONGODB_URI = 'mongodb://localhost/exampleStore';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleFeature = {
  name: 'example feature'
};
const exampleProduct = {
  name: 'sponge gloves'
};

const updateFeature = {
  name: 'new and improved feature'
};

describe('Feature Routes', function() {
  describe('POST: /api/feature/:productID/feature', function() {
    describe('with a valid product id and feature body', () => {
      before( done => {
        new Product(exampleProduct).save()
        .then( product => {
          this.tempProduct = product;
          done();
        })
        .catch(done);
      });
      after( done => {
        Promise.all([
          Product.remove({}),
          Feature.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a feature', done => {
        request.post(`${url}/api/product/${this.tempProduct.id}/feature`)
        .send(exampleFeature)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleFeature.name);
          expect(res.body.productID).to.equal(this.tempProduct._id.toString());
          done();
        });
      });
    });
  });

  describe('GET: /api/feature/:id', function(){
    describe('with a valid id', function(){
      before( done => {
        new Product(exampleProduct).save()
        .then( product => {
          this.tempProduct = product;
          return Product.findByIdAndAddFeat(this.tempProduct.id, exampleFeature)
        })
        .then( feature => {
          this.feature = feature;
          done();
        })
        .catch(done);
      });
      after( done => {
        Promise.all([
          Product.remove({}),
          Feature.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return our example feature', done => {
        // debug(this.feature.id);
        request.get(`${url}/api/feature/${this.feature.id}`)
        .end((err, res) => {
          // debug('we made it here!!!!!!');
          // debug(this.feature);
          // debug(res);
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });//end get test

  describe('PUT: /api/features/:id/update', function(){
    describe('with a valid id and request body', function(){
      before( done => {
        new Product(exampleProduct).save()
        .then( product => {
          this.tempProduct = product;
          return Product.findByIdAndAddFeat(this.tempProduct.id, exampleFeature)
        })
        .then( feature => {
          this.feature = feature;
          done();
        })
        .catch(done);
      });
      after( done => {
        Promise.all([
          Product.remove({}),
          Feature.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should update our feature', done => {
        request.put(`${url}/api/feature/${this.feature.id}/update`)
        .send(updateFeature)
        .end((err, res) => {
          if(err) return done(err);
          // debug(res.body);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });//end put test


});//end feature test routes
