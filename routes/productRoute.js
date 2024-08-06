/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/products/createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with name, description, and an optional image
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Successfully created product
 *       '400':
 *         description: Bad request, missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/getProducts:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved products
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/getProductById/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the product
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's name, description, or image by its ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Successfully updated the product
 *       '400':
 *         description: Bad request, missing parameters
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the product
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/multer');
const {requireRole}=require('../middlewares/authMiddleware')


// Routes for Product 
router.post('/createProduct',requireRole('superadmin'), upload.single('productImage'), productController.createProduct);
router.get('/getProducts' , productController.getProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/updateProduct/:id',requireRole('superadmin'), upload.single('productImage'), productController.updateProduct);
router.delete('/deleteProduct/:id',requireRole('superadmin'), productController.deleteProduct);

module.exports = router;
