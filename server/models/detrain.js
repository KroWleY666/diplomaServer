'use strict';
module.exports = (sequelize, DataTypes) => {
  const DETrain = sequelize.define('DETrain', {
    detrain_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dt_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    train_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  DETrain.associate = function(models) {
    // associations can be defined here
  };
  return DETrain;
};