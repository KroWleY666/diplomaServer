module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trains', {
      train_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type_train_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {model: 'TypeTrains', key: 'type_train_id', as: 'type_train_id'}
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      level_train_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {model: 'LevelTrains', key: 'level_train_id', as: 'level_train_id'}
      },
      definition: {
        allowNull: false,
        type: Sequelize.TEXT
       // validate: { len: [0,3000] }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trains');
  }
};