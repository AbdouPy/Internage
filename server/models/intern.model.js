
module.exports = (sequelize, DataTypes) => {
    const Intern = sequelize.define("intern", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: { type: DataTypes.STRING },
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthDate: DataTypes.STRING,
        university: DataTypes.STRING,
        field_of_study: DataTypes.STRING,
        internship_period: DataTypes.INTEGER,

    });

    Intern.associate = models => {
        Intern.belongsToMany(models.Program, {
            through: models.Application,
            foreignKey: "intern_id"
        });
        Intern.hasMany(models.Application, {
            foreignKey: "intern_id"
        });
    }

    return Intern;
};
