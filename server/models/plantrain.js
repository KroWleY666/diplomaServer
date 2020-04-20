'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlanTrain = sequelize.define('PlanTrain', {
    pt_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    train_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    plan_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  PlanTrain.associate = function(models) {
    // associations can be defined here
  };
  return PlanTrain;
};