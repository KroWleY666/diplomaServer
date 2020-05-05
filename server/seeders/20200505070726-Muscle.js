'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Muscles', [{
        title: 'Бицепс'
      },{
        title: 'Шея'
      },{
        title: 'Плечи'
      },{
        title: 'Предплечья'
      },{
        title: 'Пресс'
      },{
        title: 'Трицепс'
      },{
        title: 'Бедра'
      },{
        title: 'Ягодицы'
      }]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Muscles', null, {});
  }
};
