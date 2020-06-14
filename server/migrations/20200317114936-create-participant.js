module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Participants', {
      participant_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      age: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        validation: {
          isDate: true,
        }
      },
      heigth: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      weigth: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
     /* user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'user_id'},
        onDelete: 'CASCADE',
        unique: true
      }*/
     /* user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        reference: { model: 'Users', key: 'user_id', as: 'user_id' },
      }*/
      group_id: { //group_id
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'group_id',
          as: 'group_id'//group_id
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
   // sequelize.sync();
    return queryInterface.dropTable('Participants');
  }
};