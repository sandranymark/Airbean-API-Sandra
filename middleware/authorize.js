import jwt from 'jsonwebtoken';

/**
 * This function is a middleware that authorizes the user based on their role.
 *
 * @function authMiddleware
 * @param {...string} roles - The roles that are authorized to access the route.
 * @returns {Function} Middleware function for user authorization.
 */
const authMiddleware = (...roles) => {
    
    return (req, res, next) => {
        
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({message: 'Access denied'});
        }

        try {

            req.user = jwt.verify(token, process.env.SECRET_KEY);
            
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({message: 'Forbidden'});
            }
            
        } catch (err) {
            return res.status(400).json({message: 'Invalid token'});
        }

        next();
    }
}

export default authMiddleware;





