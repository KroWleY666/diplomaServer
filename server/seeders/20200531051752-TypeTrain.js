module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('TypeTrains', [{
        name: 'Кардио'
      },{
        name: 'Силовая'
      },{
        name: 'На выносливость'
      },{
        name: 'На скорость'
      }]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('TypeTrains', null, {});    
  }
};

