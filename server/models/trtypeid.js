'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrTypeId = sequelize.define('TrTypeId', {
    tt_id: DataTypes.INTEGER,
    type_train_id: DataTypes.INTEGER,
    train_id: DataTypes.INTEGER
  }, {});
  TrTypeId.associate = function(models) {
    // associations can be defined here
  };
  return TrTypeId;
};