const logSymbols = require("log-symbols");
const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

//object initilize. (pass parameter to constructor)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0, //hide errors
  logging: false, //outputing SQL to the console
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(logSymbols.success + "\x1b[36m%s\x1b[0m", " DB connected");
    // console.log("\x1b[36m%s\x1b[0m", "I am cyan color"); //cyan
    //https://www.codegrepper.com/code-examples/javascript/how+to+show+in+nodejs+console+a+red+cross+sine+and+a+green+tick+sine
  })
  .catch((err) => {
    console.log(logSymbols.error, " DB Connection Error");
    console.log(err);
  });

const db = {}; // Empty object

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.login = require("./login.js")(sequelize, DataTypes);
db.userProfile = require("./userProfile.js")(sequelize, DataTypes);
db.farmer = require("./farmer.js")(sequelize, DataTypes);
db.coordinator = require("./coordinator.js")(sequelize, DataTypes);
db.collectingAgent = require("./collectingAgent.js")(sequelize, DataTypes);
db.collectingRegion = require("./collectingRegion.js")(sequelize, DataTypes);
db.farmerRevenue = require("./farmerRevenue.js")(sequelize, DataTypes);
db.tag = require("./tag.js")(sequelize, DataTypes);
db.teaBucket = require("./teaBucket.js")(sequelize, DataTypes);
db.vialationsReport = require("./vialationsReport.js")(sequelize, DataTypes);
db.advance = require("./advance.js")(sequelize, DataTypes);
db.rate = require("./rate.js")(sequelize, DataTypes);

//relations
//Farmer
db.farmer.userProfile = db.farmer.belongsTo(db.userProfile, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.farmer.coordinator = db.farmer.belongsTo(db.coordinator, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.farmer.collectingAgent = db.farmer.belongsTo(db.collectingAgent, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.farmer.collectingRegion = db.farmer.belongsTo(db.collectingRegion, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// .............................................................................
//Coordinator
db.coordinator.userProfile = db.coordinator.belongsTo(db.userProfile, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.coordinator.collectingRegion = db.coordinator.belongsTo(
  db.collectingRegion,
  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }
);
// .............................................................................

//collectingAgent
db.collectingAgent.userProfile = db.collectingAgent.belongsTo(db.userProfile, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.collectingAgent.belongsTo(db.collectingRegion, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// .............................................................................

db.userProfile.login = db.userProfile.belongsTo(db.login, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.teaBucket.farmer = db.teaBucket.belongsTo(db.farmer, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.teaBucket.tag = db.teaBucket.belongsTo(db.tag, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.teaBucket.farmerRevenue = db.teaBucket.belongsTo(db.farmerRevenue, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.vialationsReport.userProfile = db.vialationsReport.belongsTo(
  db.userProfile,
  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }
);

db.advance.farmer = db.advance.belongsTo(db.farmer, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Model Synchronization in development mode
db.sequelize
  .sync({ force: false, alter: false }) //force :true - drop all tables before start
  .then(() => {
    console.log(
      logSymbols.success + "\x1b[36m%s\x1b[0m",
      " sequelize sync done ):"
    );
  });
/**
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
 */

/**
 * Synchronization in production
 * As shown above, sync({ force: true }) and sync({ alter: true }) can be destructive operations.
 * Therefore, they are not recommended for production-level software.
 * Instead, synchronization should be done with the advanced concept of Migrations, with the help of the Sequelize CLI.
 */

module.exports = db;
