module.exports = (sequelize, DataTypes) => {
  return sequelize.define("restaurant", {
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    average_price_per_person: { type: DataTypes.DECIMAL(10, 2), allowNull: false } 
  });
};
