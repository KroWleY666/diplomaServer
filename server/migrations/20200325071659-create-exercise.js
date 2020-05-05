module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Exercises', {
      exercise_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      definition:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      img:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      type:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      muscle:  {
        allowNull: false,
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
     // timestamps: false
      /*,
      duration: {
        type: Sequelize.INTEGER
      },
      approach: {
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      }*/
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises');
  }
};