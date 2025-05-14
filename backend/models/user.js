module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user' // as default user
    }
  });
};
