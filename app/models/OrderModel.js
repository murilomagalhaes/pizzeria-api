const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    deliveryAddress: { type: String, required: true },
    totalPrice: { type: Number, required: true }, // pizzas + deliveryTax,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Customer
    pizzas: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true
    }],
    finished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null },
});

module.exports = mongoose.model('Order', schema);