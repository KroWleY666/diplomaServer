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
    /*ExercParam.hasMany(models.Exercise, {
      foreignKey: 'exp_id',
      as: 'exercises',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    ExercParam.belongsTo(models.TypeEx, {
      foreignKey: 'te_id',      
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
     // targetKey: 'te_id'
    }),*/
   /* ExercParam.belongsToMany(models.Muscle, {
      as: 'muscles', 
      through: models.MuscleEP,
      foreignKey: 'exp_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })    */
  };
  return ExercParam;
};