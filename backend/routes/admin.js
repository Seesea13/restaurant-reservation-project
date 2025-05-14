const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for verifying token
const restaurantController = require('../controllers/restaurantController');

// Reservations - must verify token first
router.get('/reservations', authMiddleware, adminController.getAllReservations);

// Delete a reservation
router.delete('/reservations/:id', authMiddleware, adminController.deleteReservation);

// Restaurants
// Create a restaurant
router.post('/restaurants', authMiddleware, restaurantController.createRestaurant);

// Delete a restaurant
router.delete('/restaurants/:id', authMiddleware, restaurantController.deleteRestaurant);

// Update a restaurant
router.put('/restaurants/:id', authMiddleware, restaurantController.updateRestaurant);

module.exports = router;
