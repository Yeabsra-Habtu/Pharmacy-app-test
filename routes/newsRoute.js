/**
 * @swagger
 * /api/news/createNews:
 *   post:
 *     summary: Create a new news item
 *     description: Create a new news item with title, content, and an optional image
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               newsImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Successfully created news item
 *       '400':
 *         description: Bad request, missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/news/getNews:
 *   get:
 *     summary: Get all news items
 *     description: Retrieve all news items
 *     responses:
 *       '200':
 *         description: Successfully retrieved news items
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/news/getNewsById/{id}:
 *   get:
 *     summary: Get a news item by ID
 *     description: Retrieve a news item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the news item
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/news/updateNews/{id}:
 *   put:
 *     summary: Update a news item by ID
 *     description: Update a news item's title, content, or image by its ID
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               newsImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Successfully updated the news item
 *       '400':
 *         description: Bad request, missing parameters
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/news/deleteNews/{id}:
 *   delete:
 *     summary: Delete a news item by ID
 *     description: Delete a news item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the news item
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal server error
 */
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const upload = require('../utils/multer');
const {requireRole}=require('../middlewares/authMiddleware')

// Routes for News 
router.post('/createNews', upload.single('newsImage'),requireRole('superadmin') , newsController.createNews);
router.get('/getNews',newsController.getNews);
router.get('/getNewsById/:id', newsController.getNewsById);
router.put('/updateNews/:id', requireRole('superadmin') ,upload.single('newsImage'), newsController.updateNews);
router.delete('/deleteNews/:id', requireRole('superadmin') ,newsController.deleteNews);

module.exports = router;
