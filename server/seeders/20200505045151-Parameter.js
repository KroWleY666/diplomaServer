'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('ParamNames', [{
        name: 'Вес'
      },{
        name: 'Рост'
      },{
        name: 'Сердцебиение'
      },{
        name: 'Доля жира'
      }]);    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('ParamNames', null, {});    
  }
};
