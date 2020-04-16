'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trainExercises', {
      train_ex_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      train_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      /*  references: {
          model: 'Trains',
          key: 'train_id',
          as: 'exercisesOfTrain'
        }*/
      },
      exercise_id: {
        allowNull: false,
        type: Sequelize.INTEGER
        /*references: {
          model: 'Exercises',
          key: 'exercise_id',
          as: 'trainExercise'
        }*/
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trainExercises');
  }
};