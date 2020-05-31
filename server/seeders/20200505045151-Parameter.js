module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('ParamNames', [{
        name: 'Вес',  
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Рост',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Сердцебиение',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Доля жира',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('ParamNames', null, {});    
  }
};

