module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('StandNames', [
       { name: 'Бег 60 м (сек)' },
       { name: 'Бег 100 м (сек)' },
       { name: 'Бег 3000 м (сек)' },
       { name: 'Прыжок в длину (см)' },
       { name: 'Прыжок в высоту (см)' },
       { name: 'Отжимания в упоре лежа' },
       { name: 'Подтягивание на перекладине' },
       { name: 'Становая тяга (кг)' }
      ]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('StandNames', null, {});    
  }
};

