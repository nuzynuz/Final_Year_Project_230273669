module.exports = (Sequelize, DataTypes) => {
  const VialationsReport = Sequelize.define("vialationsReport", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return VialationsReport;
};
