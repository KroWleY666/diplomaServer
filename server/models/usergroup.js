'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    user_group_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id:  {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  UserGroup.associate = models => {
    UserGroup.belongsTo(models.User, {
      // as: 'characters', 
      // through: models.CharEx,
       foreignKey: 'user_id',
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE'
     }),
     UserGroup.belongsTo(models.Group, {
      // as: 'characters', 
      // through: models.CharEx,
       foreignKey: 'group_id',
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE'
     })
    
    // associations can be defined here
  };
  return UserGroup;
};