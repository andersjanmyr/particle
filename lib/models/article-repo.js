'use strict';
var debug = require('debug')('particle:article-repo');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

let data = [
  {
    id: 'tapirs-are-cool',
    title: 'Tapirs are cool!',
    ingress: 'Tapirs have been voted the coolest animal in history',
    text: `
    A tapir (/ˈteɪpər/ tay-pər or /təˈpɪər/ tə-peer) is a large,
    herbivorous mammal, similar in shape to a pig, with a short,
    prehensile snout. Tapirs inhabit jungle and forest regions of South
    America, Central America, and Southeastern Asia. The five extant
    species of tapirs are the Brazilian tapir, the Malayan tapir, the
    Baird's tapir, the kabomani tapir, and the mountain tapir. The four
    species that have been evaluated (the Brazilian, Malayan, Baird's and
    mountain tapir) are all classified as endangered or vulnerable. Their
    closest relatives are the other odd-toed ungulates, which include
    horses, donkeys, zebras and rhinoceri.
    `,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Malayan_Tapir_Sitting.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/TapirAtSDZ.jpg/440px-TapirAtSDZ.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Tapirbaby.jpg'
    ]
  },
  {
    id: 'sloths-are-slow',
    title: 'Sloths are slow!',
    ingress: `
    A sloth moves 25 meters per hour when they are in a hurry,
    and they are not in a hurry!
    `,
    text: `
    Sloths are tropical mammals that live in Central and South America.
    They use their long claws to hang onto branches while they feast on
    the leaves that other animals can't reach. Unfortunately for the
    sloth, their long claws — 3 to 4 inches (8 to 10 centimeters) — make
    walking on the ground difficult, so they spend most of their time in
    the tall trees they call home.

    There are two categories of sloths. The two-toed sloth is slightly
    bigger than the three-toed sloth, though they share many of the same
    features. They are about the size of a medium-sized dog at around 23
    to 27 inches (58 to 68 cm) and 17.5 to 18.75 pounds (about 8
    kilograms).

    Thousands of years ago, sloths were much bigger, according to the San
    Diego Zoo. Ancient sloths could grow to be as large as an elephant.
    They roamed North America and became extinct around 10,000 years ago.
    `,
    images: [
      'http://i.livescience.com/images/i/000/075/969/iFF/three-toed-sloth.jpg',
      'http://i.livescience.com/images/i/000/002/257/i02/080513-sleeping-sloth-02.jpg',
      'http://i.livescience.com/images/i/000/028/900/iFF/amazon-forest-sloth.jpg'
    ]
  }
];

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
        return process.nextTick(callback.bind(null, 'Article not found, id: ' + id));
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
            var message = 'Article already exists, id: ' + id;
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
    var id = article.id;
    this.findById(id, function(err, found) {
        if (!found) {
            var message = 'Article not found, id: ' + id;
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
            var message = 'Article not found, id: ' + id;
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
