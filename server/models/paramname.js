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
  
  ParamName.associate = models => {
    ParamName.hasMany(models.Parameter, {
      foreignKey: 'pn_id',      
      as: 'parameters'
    })
    // associations can be defined here
  };
  return ParamName;
};