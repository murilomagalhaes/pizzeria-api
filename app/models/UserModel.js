const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // If false, user is a customer
    createdAt: { type: Date, default: Date.now() }
});

schema.pre('save', function (next) {

    if (this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    next();
});

module.exports = mongoose.model('User', schema);