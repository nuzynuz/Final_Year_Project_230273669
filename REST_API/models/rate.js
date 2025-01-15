module.exports = (Sequelize, DataTypes) => {
  const Rate = Sequelize.define("rate", {
    rate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Rate;
};
