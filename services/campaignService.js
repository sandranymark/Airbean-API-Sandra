import { db } from "../models/campaign.js";

const getAll = () => db.find({});

const getById = (id) => db.findOne({ _id: id });

const insert = (campaign) => db.insert(campaign);

const update = async (campaign) => {

    const existingCampaign = await db.findOne({ _id: campaign._id });

    if (existingCampaign === null) {
        return false
    }

    await db.update({ _id: campaign._id }, { $set: campaign }, { upsert: false });

    return true;
};

const remove = async (id) => db.remove({ _id: id }, {});

export default { getAll, getById, insert, update, remove }