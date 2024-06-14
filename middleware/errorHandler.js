/**
 * This function is a middleware that handles errors in the application.
 *
 * @function errorHandler
 * @param {Object} err - The error object, which should have a status and message property.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the Express pipeline.
 */
const errorHandler = ((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message : err.message,
        status: err.status,
    });
    next();
})

export default errorHandler;