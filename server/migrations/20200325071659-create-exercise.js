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
      }/*,
      type:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      muscle:  {
        allowNull: false,
        type: Sequelize.STRING
      }*/,
      exp_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'ExercParams',
          key: 'exp_id',
          as: 'exp_id'
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
    return queryInterface.dropTable('Exercises');
  }
};