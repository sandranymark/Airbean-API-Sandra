/**
 * This function is a middleware that validates the request body against a provided schema.
 *
 * @function validate
 * @param {ObjectSchema} schema - The validation schema against which the request body is to be validated.
 * @returns {Function} Middleware function for request validation.
 */
const validate = (schema) => {
    return (req, res, next) => {
        
        const options = {
            abortEarly: false,
            errors: {
                wrap: { label: "'" }
            }
        }
        
        const {error} = schema.validate(req.body, options);

        if (error) {
            const errors = error.details.map((e) => {
                return {
                    key: e.context.key,
                    message: e.message
                }
            });
            
            return res.status(400).json({ errors: errors });
        }

        next();
    }
}

export {validate};