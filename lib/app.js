'use strict';

var debug = require('debug')('particle:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var statusRouter = require('./routes/status');
var modelRouter = require('./routes/model-router');
var ArticleRepo = require('./models/article-repo');
var articleRepo = new ArticleRepo();

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/status', statusRouter);
app.use('/api/articles', modelRouter(articleRepo));
app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
    debug('setupWebsockets');

    // Listen to connection events
    io.on('connection', function(socket) {
        debug('Connection established');
        socket.emit('something:happened', 'data');
    });

}

app.setupWebsockets = setupWebsockets;
module.exports = app;
