module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('LevelTrains', [{
        name: 'Предельный',  
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Большой',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Существенный',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Средний',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Небольшой',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('LevelTrains', null, {});    
  }
};

