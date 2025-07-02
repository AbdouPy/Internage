module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("assignment", {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    department: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("ongoing", "completed"),
      defaultValue: "ongoing",
    },
  });

  Assignment.associate = models => {
    Assignment.belongsTo(models.Intern, { foreignKey: "intern_id" });
    Assignment.belongsTo(models.Supervisor, { foreignKey: "supervisor_id" });
    Assignment.belongsTo(models.Program, { foreignKey: "program_id" });
  };

  return Assignment;
};
