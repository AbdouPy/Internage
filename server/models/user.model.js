const User = sequelize.define("User", {
  user_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'applicant'),
    defaultValue: 'applicant'
  }
});
