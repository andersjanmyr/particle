'use strict';

var express = require('express');

function modelRouter(model) {
  var router = express.Router();

  function toUrl(req, id) {
    return req.protocol + '://' + req.headers.host + req.baseUrl + '/' + id;
  }

  router.get('/', function(req, res) {
    model.find(req.query.filter, function(err, models) {
      if (err)
        return res.status(500).send(err);
      models.forEach(function(m) {
        m.url = toUrl(req, m.id);
      });
      return res.send(models);
    });
  });

  router.get('/:id', function(req, res) {
    model.findById(req.params.id, function(err, model) {
      if (err)
        return res.status(404).send(err);
      model.url = toUrl(req, model.id);
      return res.send(model);
    });
  });

  router.post('/', function(req, res) {
    model.add(req.body, function(err, id) {
      if (err)
        return res.status(500).send(err);
      return res.status(201).json(id);
    });
  });

  router.put('/:id', function(req, res) {
    req.body.id = req.params.id;
    model.update(req.body, function(err, model) {
      if (err)
        return res.status(404).send(err);
      return res.send(model);
    });
  });

  router.delete('/:id', function(req, res) {
    model.remove(req.params.id, function(err, model) {
      if (err)
        return res.status(404).send(err);
      return res.send(model);
    });
  });

  return router;
}

module.exports = modelRouter;



