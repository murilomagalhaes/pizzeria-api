class OrdersController {

    #repository = require('../repositories/OrderRepository.js');

    /**
     * Return all orders
     */
    all = async (req, res) => {
        const orders = await this.#repository.findAll().populate('pizzas');
        return res.status(orders.length > 0 ? 200 : 204).json(orders);
    }

    /**
     * Return order by _id
     */
    find = async (req, res) => {

        if (!req.params._id) {
            return res.status(400).json({ message: "Order ID is required." });
        }

        try {
            const order = await this.#repository.findById(req.params._id);

            // Don't allow non admin users to find another users orders
            if (!req.user.isAdmin && order?.user !== req.user._id) {
                return res.status(405).json({ message: 'not allowed' });
            }

            if (order) {
                return res.status(200).json(order);
            }
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Error while trying to find order. Try again.'
            });
        }


        return res.status(404).json({ message: 'Order not found.' });
    }


    /**
     * Creates a new order
     */
    create = async (req, res) => {

        const pizzaRepo = require('../repositories/PizzaRepository.js');

        // Only non admin users can make orders
        if (req.user.isAdmin) {
            return res.status(405).json({ message: 'not allowed' });
        }


        try {

            const pizzas = await pizzaRepo.findManyById(req.body.pizzas);

            if (pizzas.length !== req.body.pizzas.length) {
                return res.status(400).json({ message: "Pizza not found" });
            }

            const totalPrice = Number(pizzas.map(p => p.price).reduce((a, b) => a + b, 0)).toFixed(2);

            const createdOrder = await this.#repository.create({
                ...req.body,
                totalPrice,
                user: { _id: "642c85a42b1cc2eb9ce78b41" }
            });

            return res.status(201).json(createdOrder);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to create order. Try again.' });
        }

    }


    /**
     * Finishes the order
     */
    finish = async (req, res) => {

        if (!req.params._id) {
            return res.status(400).json({ message: "Order ID is required." });
        }

        try {
            const finishedOrder = await this.#repository.finish(req.params._id);

            if (!finishedOrder) {
                return res.status(404).json({ message: 'Order not found.' });
            }

            return res.status(200).json(finishedOrder);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to finish order. Try again.' });
        }
    }

    /**
     * Soft deletes order
     */
    trash = async (req, res) => {
        if (!req.params._id) {
            return res.status(400).json({ message: "Order ID is required." });
        }

        try {
            const trashedOrder = await this.#repository.trash(req.params._id);

            if (!trashedOrder) {
                return res.status(404).json({ message: 'Order not found.' });
            }

            return res.status(200).json(trashedOrder);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to delete order. Try again.' });
        }
    }


}

module.exports = new OrdersController();