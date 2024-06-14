import {db} from "../models/user.js";
import jwt from "jsonwebtoken";

const login = async (username, password) => {

    const user = await db.findOne({username: username, password: password});

    if (user === null) {
        throw new Error("Invalid credentials.")
    }

    return jwt.sign({id: user._id, username: user.username, role: user.role }, process.env.SECRET_KEY);
}

export default {login}