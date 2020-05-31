module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('StandNames', [{
        name: 'Бег 100 м',  
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Подтягивание на перекладине',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Жим',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Поднимание пресса',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('StandNames', null, {});    
  }
};

