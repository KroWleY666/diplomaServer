'use strict';
module.exports = (sequelize, DataTypes) => {
  const CharEx = sequelize.define('CharEx', {
    ce_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    character_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    exercise_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  CharEx.associate = models => {
    CharEx.belongsTo(models.Character, {
      foreignKey: 'character_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    CharEx.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return CharEx;
};