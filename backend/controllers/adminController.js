const db = require('../models'); // Import Sequelize models
const { Op } = require('sequelize');

exports.getAllReservations = async (req, res) => {
  try {
    // ⚡ Verify admin access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view all reservations.' });
    }

    // Fetch all reservations including user and restaurant details
    const reservations = await db.Reservation.findAll({
      include: [
        { model: db.User, attributes: ['id', 'email', 'name'] },
        { model: db.Restaurant, attributes: ['id', 'name'] }
      ]
    });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied.' });
    }

    const { id } = req.params;
    const deleted = await db.Reservation.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    res.json({ message: 'Deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
