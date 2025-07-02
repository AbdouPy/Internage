// models/program.model.js
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define("program", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Program.associate = (models) => {
    Program.belongsToMany(models.Intern, {
      through: models.Application,
      foreignKey: "program_id"
    });
    Program.hasMany(models.Application, {
      foreignKey: "program_id"
    });
  };

  return Program;
};
