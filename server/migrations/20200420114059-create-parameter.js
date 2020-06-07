'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Parameters', {
      param_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE,
        /*validation: {
          isDate: true,
        },
        options: {
          format: 'DD/MM/YYYY',
         // message: 'The value is not a valid date',
          min: '01/01/1920',
      },
        timestamps: false*/
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE
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
      pn_id: { 
        type: Sequelize.INTEGER,  
        allowNull: false,      
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { model: 'ParamNames', key: 'pn_id', as: 'pn_id'}
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Parameters');
  }
};