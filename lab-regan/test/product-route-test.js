'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('product:product-route-test');

const PORT = process.env.PORT || 3000;
const Product = require('../model/product.js');

process.env.MONGODB_URI = 'mongodb://localhost/exampleStore';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleProduct = {
  name: 'sponge gloves'
};

describe('List Routes', function(){
  describe('POST: /api/product', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempProduct){
          Product.remove({})
          .then( () => done())
          .catch(done);
          return;
        };
        done();
      });
      it('should return a list', done => {
        request.post(`${url}/api/product`)
        .send(exampleProduct)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('sponge gloves')
          this.tempProduct = res.body;
          done();
        });
      });//end it
    });//valid body
    describe('with an invalid body', function(){
      it('should return 400 bad request', done => {
        request.post(`${url}/api/product`)
        .send('')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });//invalid body
  });//POST


  describe('GET: /api/product', function(){
    describe('with a valid id request', function(){
      before( done => {
        exampleProduct.timestamp = new Date();
        new Product(exampleProduct).save()
        .then( product => {
          this.tempProduct = product;
          done();
        })
        .catch(done);
      });
      after(done => {
        delete exampleProduct.timestamp;
        if(this.tempProduct){
          Product.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a product', done =>{
        request.get(`${url}/api/product/${this.tempProduct._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('sponge gloves');
          done();
        });
      });
    });
    describe('with an invalid id request', function(){
      it('should return a 404', done => {
        request.get(`${url}/api/product/123456789`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });//end GET

  describe('PUT: /api/product', function(){
    describe('with a valid request', function(){
      before( done => {
        exampleProduct.timestamp = new Date();
        new Product(exampleProduct).save()
        .then( product => {
          this.tempProduct = product;
          done();
        })
        .catch(done);
      });
      after(done => {
        delete exampleProduct.timestamp;
        if(this.tempProduct){
          Product.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should update a product', done => {
          request.put(`${url}/api/product/${this.tempProduct._id}/hamburglar`)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('hamburglar');
            done();
          })
      })//end it
    })
  })//end put

});//end List Routes
