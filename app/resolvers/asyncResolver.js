/**
 * Adaptador para lidar com erros lançados em métodos assíncronos do express
 */
module.exports = (handler) => {
    return (req, res, next) => {
        return Promise.resolve(handler(req, res, next)).catch(e => next(e));
    }
}