/**
 * 
  ==== Providing the table name directly ====
  You can simply tell Sequelize the name of the table directly as well:

  sequelize.define('User', {
    // ... (attributes)
  }, {
    tableName: 'Employees'
  });
 */

module.exports = (Sequelize, DataTypes) => {
  const Login = Sequelize.define("login", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "offline",
    },
  });

  return Login;
};
