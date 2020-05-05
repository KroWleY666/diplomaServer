'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrainExercise = sequelize.define('TrainExercise', {
    train_ex_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    train_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    exercise_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  });

  TrainExercise.associate = models => {
    TrainExercise.belongsTo(models.Train, {
      foreignKey: 'train_id',
     // as: 'participants'
      onDelete: 'CASCADE'
    }),
    TrainExercise.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
     // as: 'participants'
      onDelete: 'CASCADE'
    })
    // associations can be defined here
  };
  return TrainExercise;
};