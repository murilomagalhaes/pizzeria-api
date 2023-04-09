const router = require('express').Router();
const controller = require('../controllers/UsersController.js');
const resolver = require('../resolvers/asyncResolver.js');
const { createValidation } = require('../middlewares/userValidations.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');

module.exports = router
    .get('/all',             authMiddleware, adminMiddleware, resolver(controller.all))
    .get('/find/:_id',       authMiddleware, resolver(controller.find))
    .post('/create',         createValidation, resolver(controller.create))
    .patch('/update/:_id',   authMiddleware, resolver(controller.update))
    .delete('/destroy/:_id', authMiddleware, resolver(controller.destroy));
