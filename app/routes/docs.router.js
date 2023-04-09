const router = require('express').Router();
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

module.exports = router
    .use('/api', swaggerui.serve)
    .get('/api', swaggerui.setup(swaggerDocument));

     
