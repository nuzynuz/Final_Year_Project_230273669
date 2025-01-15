module.exports = (Sequelize, DataTypes) => {
  const collectingRegion = Sequelize.define("collectingRegion", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return collectingRegion;
};
