'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExercParam = sequelize.define('ExercParam', {
    exp_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    te_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    mscl_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  ExercParam.associate = models => {
    ExercParam.hasMany(models.Exercise, {
      foreignKey: 'exp_id',
      as: 'exercises'
    }),
    ExercParam.hasMany(models.Muscle, {
      foreignKey: 'mscl_id',      
      as: 'muscles'
    }),
    ExercParam.hasOne(models.TypeEx, {
      foreignKey: 'te_id',
      targetKey: 'te_id'
    })

    
    // associations can be defined here
  };
  return ExercParam;
};