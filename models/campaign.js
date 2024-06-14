import nedb from "nedb-promises";
import Joi from "joi";

export const campaignSchema = Joi.object({
    _id: Joi.string(),
    totalPrice: Joi.number().required(),
    combinations: Joi.array().items(Joi.object({
        productId: Joi.string().required()
    })).min(1).message('At least one product need to be added to the campaign.'),
    validFrom: Joi.date().required(),
    validUntil: Joi.date().required()
});

export const db = nedb.create({
    filename: 'persistence/campaigns.db',
    autoload: true
});

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