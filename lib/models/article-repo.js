'use strict';
var debug = require('debug')('particle:article-repo');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

// ArticleRepo
var data = [{
    id: 'geb',
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter'
},
{
    id: 'bof',
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch'
},
{
    id: 'zam',
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig'
},
{
    id: 'fbr',
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb'
}];

function clone(object) {
    var copy = {};
    for (var key in object)
        copy[key] = object[key];
    return copy;
}

function copy() {
    return data.map(function(articles) {
        return clone(articles);
    });
}

function ArticleRepo() {
    this.data = copy();
    EventEmitter.call(this);
}
util.inherits(ArticleRepo, EventEmitter);

ArticleRepo.prototype.find = function find(filter, callback) {
    if (!filter)
        return process.nextTick(callback.bind(null, null, this.data));

    // Call the callback on next iteration with this=null, err=null, data=data
    var filtered = this.data.filter(function(article) {
        var regex = new RegExp(filter, 'i');
        return regex.test(article.author) || regex.test(article.title);
    });
    debug(filtered);
    process.nextTick(callback.bind(null, null, filtered));
};

ArticleRepo.prototype.findById = function findById(id, callback) {
    var found = this.data.filter(function(articles) {
        return articles.id === id;
    });
    if (found.length)
        return process.nextTick(callback.bind(null, null, found[0]));
    else
        return process.nextTick(callback.bind(null, 'ArticleRepo not found, id: ' + id));
};

ArticleRepo.prototype.createId = function createId(title) {
    var words = title.toLowerCase().split(/[ .]/).filter(function(word) {
        return ['a', 'of', 'the'].indexOf(word) === -1;
    });

    if (words.length > 2)
        return words[0].charAt(0) + words[1].charAt(0) + words[2].charAt(0);
    else if (words.length > 1)
        return words[0].slice(0, 2) + words[1].charAt(0);
    return words[0].slice(0, 3);
};

ArticleRepo.prototype.add = function add(articles, callback) {
    var self = this;
    var id = this.createId(articles.title);
    this.findById(id, function(err, found) {
        if (found) {
            var message = 'ArticleRepo already exists, id: ' + id;
            self.emit('error', message);
            return callback && process.nextTick(callback.bind(null, message));
        }
        articles.id = id;
        self.data.push(articles);
        self.emit('added', articles);
        return callback && process.nextTick(callback.bind(null, null, id));
    });
};

ArticleRepo.prototype.update = function update(article, callback) {
    var self = this;
    var id = articles.id;
    this.findById(id, function(err, found) {
        if (!found) {
            var message = 'ArticleRepo not found, id: ' + id;
            self.emit('error', message);
            return callback && process.nextTick(callback.bind(null, message));
        }
        found.title = article.title;
        found.author = article.author;
        self.emit('updated', found);
        return callback && process.nextTick(callback.bind(null, null, found));
    });
};

ArticleRepo.prototype.remove = function remove(article, callback) {
    var self = this;
    var id = article.id || article;
    this.findById(id, function(err, articles) {
        if (!articles) {
            var message = 'ArticleRepo not found, id: ' + id;
            self.emit('error', message);
            return callback && process.nextTick(callback.bind(null, message));
        }
        var i = self.data.indexOf(articles);
        self.data.splice(i, 1);
        self.emit('removed', articles);
        return callback && process.nextTick(callback.bind(null, null, articles));
    });
};

ArticleRepo.prototype.reset = function reset() {
    this.data = copy();
};

module.exports = ArticleRepo;
