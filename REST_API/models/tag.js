module.exports = (Sequelize, DataTypes) => {
  const Tag = Sequelize.define("tag", {
    tagId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activatedTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    releaseTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Tag;
};
