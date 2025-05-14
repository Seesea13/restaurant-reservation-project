const db = require('../models');

exports.createReservation = async (req, res) => {
  const { restaurantId, date, time, people_count } = req.body;
  const userId = req.user.id; // Extracted from JWT token middleware

  try {
    const newReservation = await db.Reservation.create({
      date,
      time,
      people_count,
      userId,
      restaurantId
    });

    res.status(201).json({ message: 'Reservation successful', reservation: newReservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id; // From token
    if (!userId) {
      return res.status(401).json({ message: 'User authentication failed' });
    }

    const reservations = await db.Reservation.findAll({
      where: { userId },
      include: {
        model: db.Restaurant,
        attributes: ['id', 'name', 'location']
      }
    });

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: error.message });
  }
};
