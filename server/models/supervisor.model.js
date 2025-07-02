// File: server/models/supervisor.model.js
module.exports = (sequelize, DataTypes) => {
  const Supervisor = sequelize.define("supervisor", {
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    phone: DataTypes.STRING,
    department: DataTypes.STRING
  });

  return Supervisor;
};
