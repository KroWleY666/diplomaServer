'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Standarts', {
      standart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     /* test: {
        type: Sequelize.STRING,
        allowNull: false
      },*/
      data: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      participant_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Participants',
          key: 'participant_id',
          as: 'participant_id'
        }
      },
      stn_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'StandNames',
          key: 'stn_id',
          as: 'stn_id'
        }
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
    return queryInterface.dropTable('Standarts');
  }
};