module.exports = (Sequelize, DataTypes) => {
  const coordinator = Sequelize.define("coordinator", {
    empId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return coordinator;
};
