/**
 * @swagger
 * tags:
 *   name: Vacancies
 *   description: API endpoints for managing vacancies
 */

/**
 * @swagger
 * /api/vacancies/createVacancy:
 *   post:
 *     summary: Create a new vacancy
 *     description: Create a new vacancy with title and description
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully created vacancy
 *       '400':
 *         description: Bad request, missing parameters
 */

/**
 * @swagger
 * /api/vacancies/getVacancies:
 *   get:
 *     summary: Get all vacancies
 *     description: Retrieve all vacancies
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved vacancies
 */

/**
 * @swagger
 * /api/vacancies/getVacancyById/{id}:
 *   get:
 *     summary: Get a vacancy by ID
 *     description: Retrieve a vacancy by its ID
 *     tags: [Vacancies]
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
 *         description: Successfully retrieved the vacancy
 *       '404':
 *         description: Vacancy not found
 */

/**
 * @swagger
 * /api/vacancies/updateVacancy/{id}:
 *   put:
 *     summary: Update a vacancy by ID
 *     description: Update a vacancy's title or description by its ID
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated the vacancy
 *       '400':
 *         description: Bad request, missing parameters
 *       '404':
 *         description: Vacancy not found
 */

/**
 * @swagger
 * /api/vacancies/deleteVacancy/{id}:
 *   delete:
 *     summary: Delete a vacancy by ID
 *     description: Delete a vacancy by its ID
 *     tags: [Vacancies]
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
 *         description: Successfully deleted the vacancy
 *       '404':
 *         description: Vacancy not found
 */
const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');
const {requireRole}=require('../middlewares/authMiddleware')


// Routes for Vacancy 
router.post('/createVacancy',requireRole('superadmin') ,vacancyController.createVacancy);
router.get('/getVacancies',vacancyController.getVacancies);
router.get('/getVacancyById/:id', vacancyController.getVacancyById);
router.put('/updateVacancy/:id',requireRole('superadmin') ,  vacancyController.updateVacancy);
router.delete('/deleteVacancy/:id',requireRole('superadmin') , vacancyController.deleteVacancy);

module.exports = router;
