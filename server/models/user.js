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
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      /*User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'user_id',
        otherKey: 'role_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),*/
      User.belongsToMany(models.Group, {
        as: 'users', 
        through: models.UserGroup,
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      User.belongsTo(models.Role, {
       // through: models.UserRole,
        foreignKey: 'role_id',
        //otherKey: 'role_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),
      User.hasOne(models.Participant, {
      //  foreignKey: 'user_id',
       // through: models.UserRole,
        //foreignKey: 'user_id',
        //otherKey: 'role_id',
        as: 'participants', 
        foreignKey: 'user_id', 
        //targetKey: 'user_id',
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