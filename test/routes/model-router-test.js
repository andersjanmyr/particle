var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var bodyParser = require('body-parser');

var modelRouter = require('../../lib/routes/model-router');
var ArticleRepo = require('../../lib/models/article-repo.js');
var model = new ArticleRepo();

var app = express();
app.use(bodyParser.json());
app.use('/models', modelRouter(model));

describe('modelRouter', function() {
    before(function() {
        model.reset();
    });
    describe('GET /models?filter=sloth', function() {
        it('responds with matching models', function(done) {
            request(app)
            .get('/models?filter=sloth')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.length).to.equal(1);
                expect(res.body.length).to.equal(1);
                done();
            });
        });
    });

    describe('GET /models/tapirs-are-cool', function() {
        it('responds with matching model', function(done) {
            request(app)
            .get('/models/tapirs-are-cool')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Tapirs/);
                done();
            });
        });
    });

    describe('POST /models', function() {
        it('adds the new model', function(done) {
            request(app)
            .post('/models')
            .send({title: 'Giraff swims!'})
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body).to.equal('giraff-swims');
                done();
            });
        });
    });

    describe('PUT /models/tapirs-are-cool', function() {
        it('responds with matching model', function(done) {
            request(app)
            .put('/models/tapirs-are-cool')
            .send({title: 'Fakemodel rocks!'})
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Fakemodel/);
                done();
            });
        });
    });

    describe('DELETE /models/tapirs-are-cool', function() {
        it('responds with matching model', function(done) {
            request(app)
            .delete('/models/tapirs-are-cool')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Fakemodel/);
                done();
            });
        });
    });
});
