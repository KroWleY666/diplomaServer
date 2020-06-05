'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CharExes', {
      ce_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      character_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
       /* references: {
          model: 'Characters',
          key: 'character_id',
          as: 'character_id'
        }*/
      },
      train_ex_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        /*allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Exercises',
          key: 'exercise_id',
          as: 'exercise_id'
        }*/
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CharExes');
  }
};