const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    flavour: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Pizza', schema);