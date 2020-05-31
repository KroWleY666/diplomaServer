'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrLevId = sequelize.define('TrLevId', {
    tl_id: DataTypes.INTEGER,
    level_train_id: DataTypes.INTEGER,
    train_id: DataTypes.INTEGER
  }, {});
  TrLevId.associate = function(models) {
    // associations can be defined here
  };
  return TrLevId;
};