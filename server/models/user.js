module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
     /* name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },*/
     /* role: {
        type: DataTypes.STRING,
        allowNull: false
      },*/
      salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }/*,
      group_id: {
        type: DataTypes.INTEGER
        //allowNull: true
      }*/
    });

    User.associate = models => {
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'user_id',
        otherKey: 'role_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })/*,
      User.hasMany(models.Group, {
        foreignKey: 'user_id',
        as: 'userGroups'
      })*/
    };
    return User;
  };