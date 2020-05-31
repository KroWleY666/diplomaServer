module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'role_id',
      otherKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    // associations can be defined here
  };
  return Role;
};