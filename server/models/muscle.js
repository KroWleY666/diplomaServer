'use strict';
module.exports = (sequelize, DataTypes) => {
  const Muscle = sequelize.define('Muscle', {
    mscl_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  Muscle.associate = function(models) {
    // associations can be defined here
  };
  return Muscle;
};