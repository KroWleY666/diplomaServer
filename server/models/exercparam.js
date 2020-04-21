'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExercParam = sequelize.define('ExercParam', {
    exp_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    muscle: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  ExercParam.associate = models => {
    // associations can be defined here
  };
  return ExercParam;
};