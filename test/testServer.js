'use strict'
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
var mongoose = require('mongoose');
let Users = require(__dirname + '/../models/users_model');
require(__dirname + '/../server');

describe('tests creating new user', () => {
  it('expect user to name: dude, with status 200 and property password ', (done) => {
    request('localhost:3000')
      .post('/api/createUser')
      .send('{"name":"dude", "password":"123456"}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.body.status).to.eql(200);
        expect(res.body.data).to.have.a.property('password');
        expect(res.body.data['name']).to.eql('dude');
        done();
      })
  })

  it('expect \'invalid user\' json, with status 400', (done) => {
    request('localhost:3000')
      .post('/api/createUser')
      .send('{"name":"dude", "password":"123456"}')
      .end((err, res) => {
        expect(res).to.be.json;
        expect(err.status).to.eql(400);
        expect(res.body.message).to.eql('invalid name');
        done();
      })
  })
})

describe('tests creating a hashed password and a token', () => {
  it('expect user to have status 200 with a property token on valid login', (done) => {
    request('localhost:3000')
      .post('/public/login')
      .auth('dude', '123456')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.be.json;
        expect(res.status).to.eql(200);
        expect(res.body).to.have.a.property('token');
        done();
      })
  })

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })
})
