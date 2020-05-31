module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
      user_role_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /*onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key: 'role_id',
          as: 'role_id',
        },*/
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserRoles');
  }
};