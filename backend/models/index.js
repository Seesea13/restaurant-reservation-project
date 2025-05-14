const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Restaurant = require('./restaurant')(sequelize, Sequelize);
db.Reservation = require('./reservation')(sequelize, Sequelize);

// 关联关系
db.User.hasMany(db.Reservation);
db.Reservation.belongsTo(db.User);

db.Restaurant.hasMany(db.Reservation);
db.Reservation.belongsTo(db.Restaurant);

module.exports = db;
