module.exports = {
    
    createValidation: (req, res, next) => {

        const body = req.body;
        let errors = [];

        if (!body.name || body.name.length < 2) {
            errors.push({ field: 'name', error: 'The name field is required and must contain at least 2 characters' });
        }

        if (!body.email || body.name.includes('@')) {
            errors.push({ field: 'email', error: 'The email field is required and must be a valid email' });
        }

        if (!body.password || body.password.length < 6) {
            errors.push({ field: 'password', error: 'The password field is required and must contain at least 6 characters' });
        }

        if (errors.length) {
            return res.status(400).json(errors);
        }

        return next();
    }
}