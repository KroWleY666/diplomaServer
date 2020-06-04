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
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.DATE,
        allowNull: false,
        validation: {
          isDate: true,
        }
      },
      heigth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weigth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      group_id: { //group_id
        type: Sequelize.INTEGER,
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