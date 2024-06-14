import nedb from 'nedb-promises';
import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const db = nedb.create({
    filename: 'persistence/users.db',
    autoload: true
});