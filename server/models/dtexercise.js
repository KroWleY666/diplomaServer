'use strict';
module.exports = (sequelize, DataTypes) => {
  const DTExercise = sequelize.define('DTExercise', {
    dtexer_id: DataTypes.INTEGER,
    dt_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER
  }, {});
  DTExercise.associate = function(models) {
    // associations can be defined here
  };
  return DTExercise;
};