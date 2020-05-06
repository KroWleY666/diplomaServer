'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DETrains', {
      detrain_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dt_id: {
        allowNull: false,
        type: Sequelize.INTEGER
       // onDelete: 'CASCADE',
       /* references: {
          model: 'DateTrain',
          key: 'dt_id'
        }*/
      },
      train_id: {
        allowNull: false,
        type: Sequelize.INTEGER
       /* references: {
          model: 'DateTrain',
          key: 'train_id'
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
    return queryInterface.dropTable('DETrains');
  }
};