'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PartGroups', {
      part_group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        /*references: {
          model: 'Groups',
          key: 'group_id',
          as: 'groups'
        }*/
      },
      participant_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        /*references: {
          model: 'Participants',
          key: 'participant_id',
          as: 'participant_id'
        }*/
      }
      /*createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }*/
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PartGroups');
  }
};