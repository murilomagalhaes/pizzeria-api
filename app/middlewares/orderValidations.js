module.exports = {

    createValidation: (req, res, next) => {

        const body = req.body;
        let errors = [];

        if (!body.deliveryAddress) {
            errors.push({ field: 'deliveryAddress', error: 'The deliveryAddress field is required' });
        }

        if (!body.pizzas || body.pizzas.length < 1) {
            errors.push({ field: 'pizzas', error: 'The pizza field is required and must contain at least 1 item' });
        }

        if (errors.length) {
            return res.status(400).json(errors);
        }

        return next();
    }
}