const { verifyPassword, generateJwt } = require('../services/authService.js');

class AuthController {
    login = async (req, res) => {

        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: "Email and password are required for login." });
        }

        const userRepo = require('../repositories/UserRepository.js');

        const user = await userRepo.findByEmail(req.body.email);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const validPassword = verifyPassword(req.body.password, user.password);
        

        if (validPassword) {
            const payload = { _id: user.id, email: user.email, isAdmin: user.isAdmin };

            return res.status(200).send({
                user: payload,
                token: generateJwt(payload)
            });
        }

        return res.status(400).send({ message: "Invalid credentials" });

    }
}

module.exports = new AuthController();