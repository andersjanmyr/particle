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
  },
  {
    id: 'armadillos',
    title: 'Armadillos',
    ingress: `
Armadillo is a Spanish word meaning “little armored one” and refers to the bony
plates that cover the back, head, legs, and tail of most of these odd looking
creatures. Armadillos are the only living mammals that wear such shells.
    `,
    text: `
Of the 20 varieties of armadillo, all but one live in Latin America. The
familiar nine-banded armadillo is the only species that includes the United
States in its range.

Closely related to anteaters and sloths, armadillos generally have a pointy or
shovel-shaped snout and small eyes. They vary widely in size and color, from
the 6-inch-long (15-centimeter-long), salmon-colored pink fairy armadillo to
the 5-foot-long (1.5-meter-long), dark-brown giant armadillos. Others have
black, red, gray, or yellowish coloring.
    `,
    images: [
      'http://answersafrica.com/wp-content/uploads/2013/07/armadillo.jpg',
      'http://i.dailymail.co.uk/i/pix/2015/07/31/19/2AC1E04500000578-0-image-a-64_1438368683882.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW9GAHr173cFNRPF2OIpCqp9UoC_-uiWMZTh_nR5dfWn7Hr_9PKw'
    ]
  },
  {
    id: 'giant-anteater',
    title: 'Giant Anteater',
    ingress: `
The largest of four anteater species, the giant anteater may be five to seven feet long, from nose to tail, and weigh 40 to 100 pounds. It has a narrow head, long nose, small eyes, and round ears. Its coarse hair may be gray or brown, with a white-banded black stripe running along the body to mid-torso, and a long, bushy tail, which can be two to three feet long. Its front feet have large claws, which are curled under when it walks. It has poor vision but a keen sense of smell.

    `,
    text: `
The giant anteater detects termite mounds and anthills with its keen sense of smell and tears them open with its strong claws. What we call an anteater's nose is actually an elongated jaw with a small, black, moist nose, like a dog's nose. Giant anteaters have a two-foot-long tongue and huge salivary glands that produce copious amounts of sticky saliva when they feed. Termites, ants, and their eggs stick to the tongue as it flicks in and out and the insects are scraped off by the flexing of the lower jaw and swallowed. Anteaters have a very muscular stomach that grinds up the insects and powerful digestive juices to break down their prey. They may eat as many as 30,000 ants in a day. They will also eat ripe fruit if they find it on the ground.

After a gestation of about six months, a giant anteater will give birth to one offspring, which will be weaned in a few months. The young will ride on its mother's back for up to a year and remain with the mother for up to two years, or until she becomes pregnant.

Giant anteaters are solitary, except for mothers and their young.

The IUCN classifies giant anteaters as near threatened.

Four species of anteaters and six species of sloths form the order Pilosa. Along with armadillos in the order Cingulata, they in the magnorder Xenarthra, which is Greek for "strange joint." The name comes from a feature unique to xenarthrans: special articulations between the vertebrae in the lower back. Animals in this magnorder also have fused pelvic bones and lack incisors and canines. Anteaters are in the suborder of Pilosa called Vermilingua (animals with a worm-like tongue).
    `,
    images: [
      'http://answersafrica.com/wp-content/uploads/2013/07/armadillo.jpg',
      'http://i.dailymail.co.uk/i/pix/2015/07/31/19/2AC1E04500000578-0-image-a-64_1438368683882.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW9GAHr173cFNRPF2OIpCqp9UoC_-uiWMZTh_nR5dfWn7Hr_9PKw'
    ]
  },

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
        return regex.test(article.title) ||
          regex.test(article.ingress) ||
          regex.test(article.text);
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
    var words = title.toLowerCase().split(/[ .!,]/).filter(function(w) {
      return w;
    });
    return words.join('-');
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
        found.ingress = article.ingress;
        found.text = article.text;
        found.images = article.images;
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
