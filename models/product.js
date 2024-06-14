import nedb from "nedb-promises";
import Joi from 'joi';

export const db = nedb.create({
    filename: 'persistence/products.db',
    autoload: true
});

export const productSchema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
});

// Interceptor for adding audit field createdAt
const baseInsert = db.insert;
db.insert = async function (docs, ...args) {
    
    if (Array.isArray(docs)) {
        docs.forEach(doc => doc.createdAt = new Date());
    } else {
        docs.createdAt = new Date();
    }

    return baseInsert.call(db, docs, ...args);
}

// Interceptor for adding audit field modifiedAt
const baseUpdate = db.update;
db.update = async function (query, update, ...args) {
    
    update.$set.modifiedAt = new Date();
    
    return baseUpdate.call(db, query, update, ...args);
}