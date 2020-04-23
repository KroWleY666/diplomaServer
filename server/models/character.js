'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    character_id:  {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    /*duration: {
      allowNull: false,
      type: DataTypes.INTEGER
    },*/
    count: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    approach: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Character.associate = models => {
    Character.belongsToMany(models.Exercise, {
      as: 'exercises', 
      through: models.CharEx,
      foreignKey: 'character_id'
    })
    // associations can be defined here
  };
  return Character;
};