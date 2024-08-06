const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { requireRole } = require('../middlewares/authMiddleware');

// Routes for User entity
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// Example route with authorization
router.get('/admin', requireRole('superadmin'), (req, res) => {
  res.json({ message: 'You have access to admin panel' });
});

module.exports = router;
