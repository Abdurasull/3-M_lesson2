const express = require('express');

const viewsRouter = express.Router();
viewsRouter.get('/', (req, res) => {
  res.render('index');
});
viewsRouter.get('/register', (req, res) => {
  res.render('register');
});
viewsRouter.get('/login', (req, res) => {
  res.render('login');
});

module.exports = viewsRouter;