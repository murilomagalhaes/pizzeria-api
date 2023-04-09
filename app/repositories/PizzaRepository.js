class PizzaRepository {

    #model = require('../models/PizzaModel.js');

    /**
     * Return all pizzas
     */
    findAll() {
        return this.#model.find();
    }

    /**
     * Return pizza by _id
     */
    findById(id) {
        return this.#model.findById(id);
    }

    /**
     * Return one or more pizzas by id
     */
    findManyById(ids) {
        return this.#model.find().where('_id').in(ids);
    }


    /**
     * Create a new pizza
     */
    create(pizza) {
        return this.#model.create(pizza);
    }

    /**
     * Update pizza
     */
    update(id, dataToUpdate) {
        return this.#model.findByIdAndUpdate(id, dataToUpdate, { new: true })
    }

    /**
     * Deletes pizza
     */
    destroy(id) {
        return this.#model.findByIdAndDelete(id, { returnDocument: true })
    }
}


module.exports = new PizzaRepository();