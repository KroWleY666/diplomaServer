'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('TypeExes', [{
        type: 'Базовое'
       /* createdAt: new Date(),
        updatedAt: new Date()*/
      },{
        type: 'Изолирующее'
      }]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('TypeExes', null, {});
  }
};
