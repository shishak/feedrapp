const { readFileSync, readdirSync } = require('fs');
const AbstractServer = require('../../src/abstract-server');
const express = require('express');

const router = express.Router();

module.exports = class TestFeedServer extends AbstractServer {
  bindRoutes() {
    readdirSync(`${__dirname}/feeds`).forEach((file) => {
      router.get(`/${file.split('.')[0]}`, (req, res) => {
        res.send(readFileSync(`${__dirname}/feeds/${file}`).toString());
      });
    });

    router.get('/slow', ((req, res) => {
      setTimeout(() => {
        res.send(readFileSync(`${__dirname}/feeds/rss.xml`).toString());
      }, 500);
    }));

    this.app.use('/', router);
  }
};
