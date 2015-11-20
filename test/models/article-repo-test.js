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
                expect(models[0].title).to.match(/the/);
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
            articleRepo.add({title: 'Hamlet', author: 'Shakespeare'}, function(err, id) {
                expect(id).to.equal('ham');
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
            articleRepo.add({title: 'Julius Ceasar', author: 'Shakespeare'}, function() {
            });
        });
        it('gets an error event if the article title exists', function(done) {
            articleRepo.on('error', function(error) {
                expect(error).to.equal('ArticleRepo not found, id: missing');
                done();
            });
            articleRepo.remove({id: 'missing'}, function() {
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
            articleRepo.remove('zam', function(err) {
                articleRepo.find(null, function(err, models) {
                    expect(models.length).to.equal(len - 1);
                    done();
                });
            });
        });
        it('removes the article by article.id', function(done) {
            var len = original.length
            articleRepo.remove({id: 'geb'}, function(err) {
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
                expect(b.title).to.equal('Fooled by Randomness');
                done();
            });
            articleRepo.remove({id: 'fbr'}, function() {
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
                expect(err).to.equal('ArticleRepo not found, id: missing');
                done();
            });
        });
        it('updates the article', function(done) {
            var len = original.length
            articleRepo.update({id: 'fbr', title: 'Facebook rules!'}, function(err) {
                articleRepo.findById('fbr', function(err, articleRepo) {
                    expect(articleRepo.title).to.equal('Facebook rules!');
                    done();
                });
            });
        });
        it('sends an updated event with the article', function(done) {
            articleRepo.on('updated', function(b) {
                expect(b.title).to.equal('Federal Bureau of Randomness');
                done();
            });
            articleRepo.update({id: 'fbr', title: 'Federal Bureau of Randomness'}, function() {
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



