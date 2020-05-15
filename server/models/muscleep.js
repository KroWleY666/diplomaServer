'use strict';
module.exports = (sequelize, DataTypes) => {
  const MuscleEP = sequelize.define('MuscleEP', {
    muscle_ep_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    mscl_id:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exp_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  MuscleEP.associate = function(models) {
    // associations can be defined here
  };
  return MuscleEP;
};