'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParamName = sequelize.define('ParamName', {
    pn_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  ParamName.associate = function(models) {
    // associations can be defined here
  };
  return ParamName;
};