module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('TypeTrains', [{
        name: 'Кардио',  
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Силовая',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'На выносливость',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'На скорость',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('TypeTrains', null, {});    
  }
};

