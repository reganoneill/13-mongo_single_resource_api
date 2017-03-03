'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('product:product-route-test');

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
        request.post(`${url}/api/list/${this.tempProduct.id}/feature`)
        .send(exampleFeature)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleFeature.name);
          expect(res.body.productID).to.equal(this.tempProduct._id.toString());
          done();
        });
      });
    });
  });
});
