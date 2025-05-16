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

exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { date, time, people_count } = req.body;

  try {
    const reservation = await db.Reservation.findByPk(id);

    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    
    if (reservation.userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to edit this reservation' });
    }

    
    reservation.date = date;
    reservation.time = time;
    reservation.people_count = people_count;
    await reservation.save();

    res.json({ message: 'Reservation updated successfully', reservation });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
