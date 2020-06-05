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
    MuscleEP.belongsTo(models.Muscle, {
      //as: 'types', 
      //through: models.CharEx,
      foreignKey: 'exercise_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }),
    MuscleEP.belongsTo(models.Exercise, {
      //as: 'types', 
      //through: models.CharEx,
      foreignKey: 'mscl_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // associations can be defined here
  };
  return MuscleEP;
};