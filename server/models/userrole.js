module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    user_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  UserRole.associate = models => {
    UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
    }),
    UserRole.hasMany(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
    // associations can be defined here
  };
  return UserRole;
};