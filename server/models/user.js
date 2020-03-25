module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });
    User.associate = models => {
      User.belongsTo(models.UserRole, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      }),
      User.belongsTo(models.Group, {
        foreignKey: 'group_id',
        onDelete: 'CASCADE',
      })
    };
    return User;
  };