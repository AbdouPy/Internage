
const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

module.exports = { sequelize };

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Intern = require("./intern.model.js")(sequelize, DataTypes);
db.Program = require("./program.model.js")(sequelize, DataTypes);
db.Application = require("./application.model.js")(sequelize, DataTypes);
db.Supervisor = require("./supervisor.model.js")(sequelize, DataTypes);
db.Assignment = require("./assignment.model.js")(sequelize, DataTypes);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;
