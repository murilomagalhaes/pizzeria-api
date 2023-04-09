// Dotenv
require('dotenv').config();

// App instance
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(require('cors')({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: `http://127.0.0.1:${process.env.APP_PORT}`
}));

// Routes
app.use('/docs', require('./app/routes/docs.router.js'));
app.use('/auth', require('./app/routes/auth.routes.js'));
app.use('/users', require('./app/routes/users.routes.js'));
app.use('/pizzas', require('./app/routes/pizzas.routes.js'));
app.use('/orders', require('./app/routes/orders.routes.js'));

// Default error handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.json({ message: err.message });
});

// Run app after db is connected
require('./app/config/database.js')().then(() => {

    console.log("MongoDB connected!");

    app.listen(process.env.APP_PORT, () => {
        console.log(`App running on port ${process.env.APP_PORT}`)
    });

}).catch((e) => console.error(e));

