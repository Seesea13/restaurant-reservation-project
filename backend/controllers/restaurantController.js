const db = require('../models');

exports.createRestaurant = async (req, res) => {
  const { name, location, description, average_price_per_person } = req.body;
  try {
    const restaurant = await db.Restaurant.create({ name, location, description, average_price_per_person });
    res.status(201).json({ message: 'Restaurant created successfully', restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  const { maxPrice, minPrice } = req.query; 

  const whereClause = {};

  if (maxPrice) {
    whereClause.average_price_per_person = {
      ...(whereClause.average_price_per_person || {}),
      [db.Sequelize.Op.lte]: parseFloat(maxPrice)
    };
  }

  if (minPrice) {
    whereClause.average_price_per_person = {
      ...(whereClause.average_price_per_person || {}),
      [db.Sequelize.Op.gte]: parseFloat(minPrice)
    };
  }

  try {
    const restaurants = await db.Restaurant.findAll({ where: whereClause });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await db.Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.Restaurant.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { name, location, description, average_price_per_person } = req.body;
  const id = req.params.id;
  try {
    const restaurant = await db.Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    await restaurant.update({ name, location, description, average_price_per_person });
    res.json({ message: 'Restaurant updated successfully', restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
