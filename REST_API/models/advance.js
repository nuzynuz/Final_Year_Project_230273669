module.exports = (Sequelize, DataTypes) => {
  const advance = Sequelize.define("advance", {
    reqestedAmount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NO COMMENT ADDED",
    },
    acceptedAmount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NO REMARK ADDED",
    },
  });

  return advance;
};
