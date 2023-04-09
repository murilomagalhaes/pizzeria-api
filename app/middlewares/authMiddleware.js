
const { verifyJwt } = require('../services/authService.js');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "Authorization header not found" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).send({ message: "Malformed authorization token" });
    }

    const decoded = verifyJwt(token);

    req.user = decoded;
    
    return next();

}