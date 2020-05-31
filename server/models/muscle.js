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
  Muscle.associate = models => {
    Muscle.belongsTo(models.ExercParam, {
      foreignKey: 'mscl_id',
     // onDelete: 'CASCADE',
     // onUpdate: 'CASCADE'
    }),
    Muscle.belongsToMany(models.ExercParam, {
      as: 'exParams', 
      through: models.MuscleEP,
      foreignKey: 'mscl_id',
     // onDelete: 'CASCADE',
     // onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return Muscle;
};