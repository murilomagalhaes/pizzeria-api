module.exports = {
    
    createValidation: (req, res, next) => {

        const body = req.body;
        let errors = [];

        if (!body.flavour || body.flavour.length < 2) {
            errors.push({ field: 'flaour', error: 'The flavour field is required and must contain at least 2 characters' });
        }

        if (!body.description || body.description.length < 2) {
            errors.push({ field: 'description', error: 'The description field is required and must contain at least 2 characters' });
        }

        if (!body.price || !body.price > 0) {
            errors.push({ field: 'price', error: 'The price field is required and must be greater than 0' });
        }

        if (errors.length) {
            return res.status(400).json(errors);
        }

        return next();
    }
}