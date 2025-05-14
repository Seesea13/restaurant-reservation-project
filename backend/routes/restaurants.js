const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get restaurant details by ID
router.get('/:id', restaurantController.getRestaurantById);

module.exports = router;
