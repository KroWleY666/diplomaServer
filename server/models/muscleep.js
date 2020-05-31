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
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  MuscleEP.associate = models => {
    
    // associations can be defined here
  };
  return MuscleEP;
};