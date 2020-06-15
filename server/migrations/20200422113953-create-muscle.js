module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Muscles', {
      mscl_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Muscles');
  }
};