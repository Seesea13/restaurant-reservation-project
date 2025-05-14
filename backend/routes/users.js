const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require('../controllers/userController');

const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

// All routes are protected: authentication + admin authorization required
router.get('/', authenticateToken, authorizeRole('admin'), getUsers);
router.put('/update/:id', authenticateToken, authorizeRole('admin'), updateUser);
router.delete('/delete/:id', authenticateToken, authorizeRole('admin'), deleteUser);

module.exports = router;
