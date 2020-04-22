'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeEx = sequelize.define('TypeEx', {
    te_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  TypeEx.associate = function(models) {
    // associations can be defined here
  };
  return TypeEx;
};