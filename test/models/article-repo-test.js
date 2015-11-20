'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

var ArticleRepo = require('../../lib/models/article-repo.js');
var articleRepo;

describe('ArticleRepo', function() {

    beforeEach(function() {
        articleRepo = new ArticleRepo();
        // Hook up a default error handler to avoid crash
        articleRepo.on('error', function ignore() {});
    });

    describe('#find', function() {
        it('finds the matching articles', function(done) {
            articleRepo.find('the', function(err, models) {
                expect(models.length).to.equal(2);
                expect(models[0].title).to.match(/tapir/i);
                done();
            });
        });
    });

    describe('#add', function() {
        var original;

        before(function(done) {
            articleRepo.find(null, function(err, models) {
                original = models;
                done();
            });
        });

        it('adds the article', function(done) {
            var len = original.length
            articleRepo.add({title: 'Hamlet', ingress: 'Shakespeare'}, function(err, id) {
                expect(id).to.equal('hamlet');
                articleRepo.find(null, function(err, models) {
                    expect(models.length).to.equal(len + 1);
                    done();
                });
            });
        });

        it('sends an added event with the article', function(done) {
            articleRepo.on('added', function(b) {
                expect(b.title).to.equal('Julius Ceasar');
                done();
            });
            articleRepo.add({title: 'Julius Ceasar', ingress: 'Shakespeare'}, function() {
            });
        });
        it('gets an error event if the article title exists', function(done) {
            articleRepo.on('error', function(error) {
                expect(error).to.equal('Article already exists, id: sloths-are-slow');
                done();
            });
            articleRepo.add({title: 'Sloths are slow!'}, function() {
            });
        });
    });

    describe('#remove', function() {
        var original;

        before(function(done) {
            articleRepo.find(null, function(err, models) {
                original = models;
                done();
            });
        });

        it('removes the article by id', function(done) {
            var len = original.length
            articleRepo.remove('tapirs-are-cool', function(err) {
                articleRepo.find(null, function(err, models) {
                    expect(models.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('removes the article by article.id', function(done) {
            var len = original.length
            articleRepo.remove({id: 'tapirs-are-cool'}, function(err) {
                articleRepo.find(null, function(err, models) {
                    expect(models.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('calls back with error if article.id missing', function(done) {
            articleRepo.remove({id: 'missing'}, function(err) {
                expect(err).to.equal('Article not found, id: missing');
                done();
            });
        });
        it('sends a removed event with the article', function(done) {
            articleRepo.on('removed', function(b) {
                expect(b.title).to.equal('Tapirs are cool!');
                done();
            });
            articleRepo.remove({id: 'tapirs-are-cool'}, function() {
            });
        });
        it('gets an error event if the article is missing', function(done) {
            articleRepo.on('error', function(error) {
                expect(error).to.equal('Article not found, id: missing');
                done();
            });
            articleRepo.remove({id: 'missing'}, function() {
            });
        });

    });

    describe('#update', function() {
        var original;

        before(function(done) {
            articleRepo.find(null, function(err, models) {
                original = models;
                done();
            });
        });
        it('calls back with error if article missing', function(done) {
            articleRepo.update({id: 'missing'}, function(err) {
                expect(err).to.equal('Article not found, id: missing');
                done();
            });
        });
        it('updates the article', function(done) {
            var len = original.length
            articleRepo.update({id: 'tapirs-are-cool', title: 'Tapirs rule!'}, function(err) {
                articleRepo.findById('tapirs-are-cool', function(err, articleRepo) {
                    expect(articleRepo.title).to.equal('Tapirs rule!');
                    done();
                });
            });
        });
        it('sends an updated event with the article', function(done) {
            articleRepo.on('updated', function(b) {
                expect(b.title).to.equal('Tapirs rule!');
                done();
            });
            articleRepo.update({id: 'tapirs-are-cool', title: 'Tapirs rule!'}, function() {
            });
        });
        it('gets an error event if the article is missing', function(done) {
            articleRepo.on('error', function(error) {
                expect(error).to.equal('Article not found, id: missing');
                done();
            });
            articleRepo.update({id: 'missing', title: 'Not here'}, function() {
            });
        });
    });

    afterEach(function() {
        articleRepo.reset();
    });
});



