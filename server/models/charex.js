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
  CharEx.associate = function(models) {
    // associations can be defined here
  };
  return CharEx;
};