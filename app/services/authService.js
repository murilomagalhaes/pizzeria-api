const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyPassword: (plainTextPwd, Hash) => {

        console.log(plainTextPwd, Hash);
        return bcrypt.compareSync(plainTextPwd, Hash);
    },

    verifyJwt: (token) => {
        let decoded = null;
        let error = null

        jwt.verify(token, process.env.JWT_SECRET, (error_, token) => {
            error = error_;
            decoded = token;
        });

        if (error) {
            throw new Error(error.message);
        }

        return decoded;
    },

    generateJwt: (payload, expiresIn = 86400) => {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
    }
}