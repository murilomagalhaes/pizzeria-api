class UsersController {

    #repository = require('../repositories/UserRepository.js');

    /**
     * Return all users
     */
    all = async (req, res) => {
        const users = await this.#repository.findAll();
        return res.status(users.length > 0 ? 200 : 204).json(users);
    }

    /**
     * Return user by _id
     */
    find = async (req, res) => {

        if (!req.params._id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        try {
            const user = await this.#repository.findById(req.params._id);

            // Don't allow non admin users to get another users informations
            if (!req.user.isAdmin && user?._id !== req.user._id) {
                return res.status(405).json({ message: 'not allowed' });
            }

            if (user) {
                return res.status(200).json(user);
            }
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Error while trying to find user. Try again.'
            });
        }


        return res.status(404).json({ message: 'User not found.' });
    }

    /**
     * Create a new user
     */
    create = async (req, res) => {

        const user = this.#repository.findById(req.user?.id);

        if (!user || !user.isAdmin && req.body.isAdmin) {
            return res.status(401).json({ message: "Only logged admin users can create another admin user." });
        }

        try {
            const createdUser = await this.#repository.create(req.body);
            return res.status(201).json(createdUser);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to create user. Try again.' });
        }

    }

    /**
     * Update a existing user
     */
    update = async (req, res) => {
        if (!req.params._id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Don't allow non admin users to update another users informations
        if (!req.user.isAdmin && req.params._id !== req.user._id) {
            return res.status(405).json({ message: 'not allowed' });
        }

        try {
            const updatedUser = await this.#repository.update(req.params._id, req.body);

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            return res.status(200).json(updatedUser);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to update user. Try again.' });
        }

    }

    /**
     * Deletes a user by _id
     */
    destroy = async (req, res) => {
        if (!req.params._id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Don't allow non admin users to remove another users
        if (!req.user.isAdmin && req.params._id !== req.user._id) {
            return res.status(405).json({ message: 'not allowed' });
        }

        try {
            const deletedUser = await this.#repository.destroy(req.params._id);

            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            return res.status(200).json(deletedUser);

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Error while trying to delete user. Try again.' });
        }
    }
}


module.exports = new UsersController();