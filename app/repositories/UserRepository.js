class UserRepository {

    #model = require('../models/UserModel.js');

    /**
     * Return all users
     */
    findAll() {
        return this.#model.find();
    }

    /**
     * Return user by _id
     */
    findById(id) {
        return this.#model.findById(id);
    }

    /**
     * Return user by email
     */
    findByEmail(email) {
        return this.#model.findOne({ email });
    }

    /**
     * Create a new user
     */
    create(user) {
        return this.#model.create(user);
    }

    /**
     * Update user
     */
    update(id, dataToUpdate) {
        return this.#model.findByIdAndUpdate(id, dataToUpdate, { new: true })
    }

    /**
     * Deletes user
     */
    destroy(id) {
        return this.#model.findByIdAndDelete(id, { returnDocument: true })
    }
}

module.exports = new UserRepository();