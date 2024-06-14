import {db} from "../models/product.js";

const getAll = () => db.find({});

const getById = (id) => db.findOne({_id: id});

const getManyByIds = (ids) => db.find({ _id: {$in: ids} });

const insert = (product) => db.insert(product);

const update = async (product) => {
    const existingProduct = await db.findOne({_id: product._id});

    if(existingProduct === null) {
        return false
    }

    await db.update({ _id: product._id }, { $set: product }, {upsert: false});

    return true; 
};

const remove = async(id) => db.remove({_id: id}, {});


export default { 
    getAll, 
    getById, 
    insert, 
    update, 
    remove, 
    getManyByIds 
}