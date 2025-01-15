module.exports = (Sequelize, DataTypes) => {
  const Farmer = Sequelize.define("farmer", {
    supplierCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RFID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Farmer;
};
