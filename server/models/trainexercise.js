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

  return TrainExercise;
};