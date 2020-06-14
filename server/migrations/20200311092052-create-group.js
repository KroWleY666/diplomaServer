module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
      group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      }/*,
      sport: {
        type: Sequelize.STRING,
        allowNull: false
      }*/,
     /* user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'user_id',
          as: 'user_id'
        }
      },*/
    });
  },
  down: (queryInterface, Sequelize) => {
   // sequelize.sync();
    return queryInterface.dropTable('Groups');
  }
};