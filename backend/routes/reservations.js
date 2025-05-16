// routes/reservations.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, reservationController.createReservation);
router.get('/my', authenticateToken, reservationController.getMyReservations);
router.put('/:id', authenticateToken, reservationController.updateReservation);

module.exports = router;
