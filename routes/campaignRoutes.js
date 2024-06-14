import {Router} from 'express';
import CampaignService from "../services/campaignService.js";
import authorize from "../middleware/authorize.js";
import {campaignSchema} from "../models/campaign.js";
import {validate} from "../middleware/validate.js";
import ProductService from "../services/productService.js";

const router = Router();

/**
 * Route handler for GET requests to the '/campaign' endpoint.
 * This endpoint retrieves all campaigns.
 *
 * @route GET /campaigns
 * @group Campaign - Operations related to campaigns
 * @security JWT
 * @returns {Array.<Object>} 200 - An array of campaign objects
 */
router.get('/', authorize('admin', 'member'), async (req, res) => {
    
    const campaign = await CampaignService.getAll()

    res.json(campaign);
});


/**
 * Route handler for GET requests to the '/campaigns/:id' endpoint.
 * This endpoint retrieves a specific campaign by its ID.
 *
 * @route GET /campaigns/:id
 * @group Campaign - Operations related to campaigns
 * @param {string} id.path.required - The ID of the campaign to retrieve
 * @security JWT
 * @returns {campaignSchema} 200 - The campaign object
 * @returns {Error} 404 - Campaign not found
 * @returns {Error} default - Unexpected error
 */
router.get('/:id', authorize('admin', 'member'), async (req, res) => {
    
    const campaign = await CampaignService.getById(req.params.id);
    console.log(campaign);

    if (campaign === null) {
        return res.status(404).json({message: `Campaign with id: ${req.params.id} not found`});
    }

    res.json(campaign);
});

/**
 * Route handler for POST requests to the '/campaigns' endpoint.
 * This endpoint creates a new campaign.
 *
 * @route POST /campaigns
 * @group Campaign - Operations related to campaigns
 * @param {campaignSchema.model} campaign.body.required - The campaign to create
 * @security JWT
 * @returns {Array.<Object>} 400 - An array of error objects if any of the product IDs in the combinations are not found
 * @returns {campaignSchema.model} 201 - The created campaign object
 * @returns {Error} default - Unexpected error
 */
router.post('/', authorize('admin'), validate(campaignSchema), async (req, res) => {

    const validProducts = await ProductService.getManyByIds(req.body.combinations.map(campaign => campaign.productId));
    const errors = [];
    
    req.body.combinations.forEach(campaign => {
        if(!validProducts.find(p => p._id === campaign.productId)) {
            errors.push({productId: campaign.productId, message: 'Product not found'});
        }
    })

    if(errors.length > 0) {
        return res.status(400).json(errors);
    }
    
    const campaign = await CampaignService.insert(req.body);
    const location = `${req.protocol}://${req.get('host')}${req.originalUrl}/${campaign._id}`

    res.location(location);

    res.status(201).json(campaign);
});

/**
 * Route handler for PUT requests to the '/campaigns/:id' endpoint.
 * This endpoint updates a specific campaign by its ID.
 *
 * @route PUT /campaigns/:id
 * @group Campaign - Operations related to campaigns
 * @param {string} id.path.required - The ID of the campaign to update
 * @param {campaignSchema.model} campaign.body.required - The updated campaign object
 * @security JWT
 * @returns {Error} 400 - Request path id and request body id must match
 * @returns {Error} 400 - Product not found in campaign combinations
 * @returns {Error} 404 - Campaign not found
 * @returns {void} 204 - Successfully updated the campaign, no content returned
 */
router.put('/:id', authorize('admin'), validate(campaignSchema), async (req, res) => {

    // Passing in id in the body and comparing it to the id in the path is considered best practice.
    if (req.params.id !== req.body._id) {
        return res.status(400).json({message: `Request path id ${req.params.id} and request body id ${req.body._id} must match`})
    }

    const validProducts = await ProductService.getManyByIds(req.body.combinations.map(campaign => campaign.productId));
    const errors = [];
    
    req.body.combinations.forEach(campaign => {
        if(!validProducts.find(p => p._id === campaign.productId)) {
            errors.push({productId: campaign.productId, message: 'Product not found'});
        }
    })

    if(errors.length > 0) {
        return res.status(400).json(errors);
    }

    if(!await CampaignService.update(req.body)) {
        return res.status(404).json({message: `Campaign with id: ${req.params.id} not found`});
    }

    res.status(204).send();
});

/**
 * Route handler for DELETE requests to the '/campaigns/:id' endpoint.
 * This endpoint deletes a specific campaign by its ID.
 *
 * @route DELETE /campaigns/:id
 * @group Campaign - Operations related to campaigns
 * @param {string} id.path.required - The ID of the campaign to delete
 * @security JWT
 * @returns {Error} 404 - Campaign not found
 * @returns {void} 204 - Successfully deleted the campaign, no content returned
 */
router.delete('/:id', authorize('admin'), async (req, res) => {

    if(!await CampaignService.remove(req.params.id)) {
        return res.status(404).json({message: `Product with id: ${req.params.id} not found`});
    }

    res.status(204).send();

});

export default router;

