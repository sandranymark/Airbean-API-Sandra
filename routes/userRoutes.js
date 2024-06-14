import { Router } from "express";
import {validate} from "../middleware/validate.js";
import UserService from "../services/userService.js";
import {loginSchema} from "../models/user.js";

const router = Router();

/**
 * Route handler for POST requests to the '/login' endpoint.
 * This endpoint logs in a user by validating their username and password.
 *
 * @route POST /login
 * @group User - Operations related to users
 * @param {loginSchema.model} login.body.required - The login object {username, password}
 * @returns {Error} 401 - Wrong username or password
 * @returns {Object} 200 - An object containing the JWT token
 */
router.post('/login', validate(loginSchema), async (req, res) => {

    const token = await UserService.login(req.body.username, req.body.password);

    if (token === null) {
        return res.status(401).json({
            success: false,
            message: 'Wrong username or password',
            status: 401
        });
    }

    res.status(200).json({ token: token });
});

export default router;