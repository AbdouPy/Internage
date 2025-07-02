// File: server/models/application.model.js
module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define("application", {
        status: {
            type: DataTypes.ENUM("pending", "accepted", "rejected"),
            defaultValue: "pending"
        },
        cv: DataTypes.STRING,
        motivation_letter: DataTypes.TEXT,
    });

    Application.associate = models => {
        Application.belongsTo(models.Intern, { foreignKey: "intern_id" });
        Application.belongsTo(models.Program, { foreignKey: "program_id" });
    };

    return Application;
};
