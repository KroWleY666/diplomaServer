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
      te_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {model: 'TypeExes', key: 'te_id', as: 'te_id'}
      },
      /*exp_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'ExercParams',
          key: 'exp_id',
          as: 'exp_id'
        }
      },*/
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises');
  }
};