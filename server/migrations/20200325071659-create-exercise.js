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
      duration: {
        type: Sequelize.INTEGER
      },
      approach: {
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      },
      day: {
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
  /*    trainExercise: {
        type: Sequelize.INTEGER,
        //onDelete: 'CASCADE',
      /* references: {
         /* model: 'Trains',
          key: 'train_id',
          as: 'trainExercise',*/
       /*   model: 'trainExercises',
          key: 'train_id'
        }*/
     /* }*/
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises');
  }
};