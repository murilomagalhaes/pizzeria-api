class OrderRepository {

    #model = require('../models/OrderModel.js');

    /**
     * Return all orders
     */
    findAll() {
        return this.#model.find().where('deletedAt').equals(null).populate('user').populate('pizzas');
    }

    /**
     * Return order by _id
     */
    findById(id) {
        return this.#model.findById(id).populate('user').populate('pizzas');
    }

    /**
     * Create new order
     */
    create(order) {
        return this.#model.create(order);
    }


    /**
     * Finishes order
     */
    finish(id) {
        return this.#model.findByIdAndUpdate(id, { finished: true }, { new: true }).populate('user').populate('pizzas')
    }

    /**
     * soft deletes order
     */
    trash(id) {
        return this.#model.findOneAndUpdate(id, { deletedAt: Date.now() }, { new: true }).populate('user').populate('pizzas')
    }

}

module.exports = new OrderRepository();