module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Filters', {
      filter_user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goal: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      name:  { 
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Filters');
  }
};