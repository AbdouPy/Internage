
const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool
    }
);

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
