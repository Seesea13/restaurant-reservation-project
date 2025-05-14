const express = require('express');
const app = express();
const port = 3000;
const logger = require('./middleware/logger');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');
const restaurantRoutes = require('./routes/restaurants');
const adminRoutes = require('./routes/admin');
const db = require('./models');

// Parse JSON and URL-encoded request bodies
app.use(express.json()); // Required to access req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(logger);

// Route handlers
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Sync Sequelize models with the database
db.sequelize.sync({ alter: true }) // Automatically sync model structure (e.g., adding fields)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch(err => {
    console.log("Database connection failed:", err);
  });
