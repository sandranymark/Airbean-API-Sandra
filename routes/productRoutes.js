import {Router} from 'express';
import ProductService from "../services/productService.js";
import authorize from "../middleware/authorize.js";
import {validate} from "../middleware/validate.js";
import {productSchema} from "../models/product.js";

const router = Router();

/**
 * Route handler for GET requests to the '/products' endpoint.
 * This endpoint retrieves all products.
 *
 * @route GET /
 * @group Product - Operations related to products
 * @security JWT
 * @returns {Array.<Object>} 200 - An array of product objects
 */
router.get('/', authorize('admin', 'member'), async (req, res) => {

    const products = await ProductService.getAll()

    res.json(products);
});

/**
* Route handler for GET requests to the '/products/:id' endpoint.
* This endpoint retrieves a specific product by its ID.
*
* @route GET /:id
* @group Product - Operations related to products
* @param {string} id.path.required - The ID of the product to retrieve
* @security JWT
* @returns {Error} 404 - Product not found
* @returns {Object} 200 - The product object
*/
router.get('/:id', authorize('admin', 'member'), async (req, res) => {

    const product = await ProductService.getById(req.params.id);

    if (product === null) {
        return res.status(404).json({message: `Product with id: ${req.params.id} not found`});
    }

    res.json(product);
});

/**
 * Route handler for POST requests to the '/products' endpoint.
 * This endpoint creates a new product.
 *
 * @route POST /
 * @group Product - Operations related to products
 * @param {productSchema.model} product.body.required - The product object to create
 * @security JWT
 * @returns {Error} 400 - Request path id and request body id must match
 * @returns {Object} 201 - The created product object
 */
router.post('/', authorize('admin'), validate(productSchema), async (req, res) => {

    const product = await ProductService.insert(req.body);
    const location = `${req.protocol}://${req.get('host')}${req.originalUrl}/${product._id}`

    res.location(location);

    res.status(201).json(product);
});

/**
 * Route handler for PUT requests to the '/products/:id' endpoint.
 * This endpoint updates a specific product by its ID.
 *
 * @route PUT /:id
 * @group Product - Operations related to products
 * @param {string} id.path.required - The ID of the product to update
 * @param {productSchema.model} product.body.required - The updated product object
 * @security JWT
 * @returns {Error} 400 - Request path id and request body id must match
 * @returns {Error} 404 - Product not found
 * @returns {void} 204 - Successfully updated the product, no content returned
 */
router.put('/:id', authorize('admin'), validate(productSchema), async (req, res) => {

    // Passing in id in the body and comparing it to the id in the path is considered best practice.
    if (req.params.id !== req.body._id) {
        return res.status(400).json({message: `Request path id ${req.params.id} and request body id ${req.body._id} must match`})
    }

    if(!await ProductService.update(req.body)) {
        return res.status(404).json({message: `Product with id: ${req.params.id} not found`});
    }
    
    res.status(204).send();
});

/**
 * Route handler for DELETE requests to the '/products/:id' endpoint.
 * This endpoint deletes a specific product by its ID.
 *
 * @route DELETE /:id
 * @group Product - Operations related to products
 * @param {string} id.path.required - The ID of the product to delete
 * @security JWT
 * @returns {Error} 404 - Product not found
 * @returns {void} 204 - Successfully deleted the product, no content returned
 */
router.delete('/:id', authorize('admin'), async (req, res) => {
    
    if(!await ProductService.remove(req.params.id)) {
        return res.status(404).json({message: `Product with id: ${req.params.id} not found`});
    }

    res.status(204).send();
    
});

export default router;

