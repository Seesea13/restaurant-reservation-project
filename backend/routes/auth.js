const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Verify JWT
const bcrypt = require('bcrypt');
const db = require('../models'); // ✅ Used to access User model

// Register & Login
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// ✅ New: Change password endpoint
router.post('/change-password', authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

    const hashedNew = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNew });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
