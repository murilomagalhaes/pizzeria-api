const router = require('express').Router();
const controller = require('../controllers/AuthController.js');
const resolver = require('../resolvers/asyncResolver.js');

module.exports = router
    .post('/login', resolver(controller.login))
