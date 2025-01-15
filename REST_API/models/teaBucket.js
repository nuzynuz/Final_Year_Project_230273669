module.exports = (Sequelize, DataTypes) => {
  const teaBucket = Sequelize.define("teaBucket", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    waterWeight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    bagWeight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    netWeight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    qualityGrade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return teaBucket;
};
