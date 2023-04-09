const router = require('express').Router();
const controller = require('../controllers/OrdersController.js');
const resolver = require('../resolvers/asyncResolver.js');
const { createValidation } = require('../middlewares/orderValidations.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');

module.exports = router
    .get('/all',           authMiddleware, adminMiddleware, resolver(controller.all))
    .get('/find/:_id',     authMiddleware, resolver(controller.find))
    .post('/create',       authMiddleware, createValidation, resolver(controller.create))
    .patch('/finish/:_id',      authMiddleware, adminMiddleware, resolver(controller.finish))
    .delete('/trash/:_id', authMiddleware, adminMiddleware, resolver(controller.trash));
