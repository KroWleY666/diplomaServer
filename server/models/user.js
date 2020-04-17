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

   /* User.beforeSave((user, options) => {
      if (user.changed('password')) {
        user.salt = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    });
    User.prototype.comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
          if (err) {
              return cb(err);
          }
          cb(null, isMatch);
      });
    };*/

    User.associate = models => {
      User.belongsTo(models.UserRole, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        
      }),
      User.hasMany(models.Group, {
        foreignKey: 'user_id',
        as: 'userGroups'
      })
    };
    return User;
  };