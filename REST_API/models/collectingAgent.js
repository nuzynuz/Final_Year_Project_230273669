module.exports = (Sequelize, DataTypes) => {
  const collectingAgent = Sequelize.define("collectingAgent", {
    empId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return collectingAgent;
};
