'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
      character_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      /*duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },*/
      count: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      approach: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
     // timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Characters');
  }
};