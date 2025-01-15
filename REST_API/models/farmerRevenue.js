module.exports = (Sequelize, DataTypes) => {
  const farmerRevenue = Sequelize.define("farmerRevenue", {
    payment_for_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deduction_for_loan: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deduction_for_advance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_Rervenue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return farmerRevenue;
};
