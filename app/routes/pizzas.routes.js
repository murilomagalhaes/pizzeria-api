const router = require('express').Router();
const controller = require('../controllers/PizzasController.js');
const resolver = require('../resolvers/asyncResolver.js');
const { createValidation } = require('../middlewares/pizzaValidations.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');

module.exports = router
    .get('/all',             authMiddleware, resolver(controller.all))
    .get('/find/:_id',       authMiddleware, resolver(controller.find))
    .post('/create',         authMiddleware, adminMiddleware, createValidation, resolver(controller.create))
    .patch('/update/:_id',   authMiddleware, adminMiddleware, resolver(controller.update))
    .delete('/destroy/:_id', authMiddleware, adminMiddleware, resolver(controller.destroy))
