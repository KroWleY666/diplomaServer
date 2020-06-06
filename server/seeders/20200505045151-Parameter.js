module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('ParamNames', [
       { name: 'Вес' },
       { name: 'Рост' },
       { name: 'Процент жировой массы' },
       { name: 'Процент мышечной массы' },
       { name: 'Частота сердечных сокращений в покое' },
       { name: 'Вариабельность пульса' },
       { name: 'Восстанавливаемость пульса' },
       { name: 'Артериальное давление' }
      ]
    );    
  },

  down: (queryInterface, Sequelize) => {    
      return queryInterface.bulkDelete('ParamNames', null, {});    
  }
};

