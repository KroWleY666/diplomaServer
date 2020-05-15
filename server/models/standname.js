'use strict';
module.exports = (sequelize, DataTypes) => {
  const StandName = sequelize.define('StandName', {
    stn_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  StandName.associate = models => {
    StandName.hasMany(models.Standart, {
      foreignKey: 'stn_id',      
      as: 'standarts'
    })
    // associations can be defined here
  };
  return StandName;
};