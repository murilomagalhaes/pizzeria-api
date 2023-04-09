class PizzasController {

    #repository = require('../repositories/PizzaRepository.js');

    /**
     * Return all pizzas
     */
    all = async (req, res) => {

        const pizzas = await this.#repository.findAll();
        return res.status(pizzas.length > 0 ? 200 : 204).json(pizzas);
    }

    /**
     * Return pizza by _id
     */
    find = async (req, res) => {

        if (!req.params._id) {
            return res.status(400).json({ message: "Pizza ID is required." });
        }

        try {
            const pizza = await this.#repository.findById(req.params._id);

            if (pizza) {
                return res.status(200).json(pizza);
            }
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                message: `Error while trying to find pizza. Try again.`
            });
        }


        return res.status(404).json({ message: 'Pizza not found.' });
    }

    /**
     * Create a new pizza
     */
    create = async (req, res) => {

        try {
            const createdPizza = await this.#repository.create(req.body);
            return res.status(201).json(createdPizza);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to create pizza. Try again.' });
        }

    }

    /**
     * Update a existing pizza
     */
    update = async (req, res) => {
        if (!req.params._id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        try {
            const updatedPizza = await this.#repository.update(req.params._id, req.body);

            if (!updatedPizza) {
                return res.status(404).json({ message: 'Pizza not found.' });
            }

            return res.status(200).json(updatedPizza);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to update pizza. Try again.' });
        }

    }

    /**
     * Deletes a pizza by _id
     */
    destroy = async (req, res) => {
        if (!req.params._id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        try {
            const deletedPizza = await this.#repository.destroy(req.params._id);

            if (!deletedPizza) {
                return res.status(404).json({ message: 'Pizza not found.' });
            }

            return res.status(200).json(deletedPizza);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to delete pizza. Try again.' });
        }
    }
}

module.exports = new PizzasController();