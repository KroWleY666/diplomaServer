'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participants', [{
      name: 'Петр',
      surname: 'Петров',
      email: 'petya@mail.ru',
      sex: 'Мужчина',
      age: '12.09.1984',
      heigth: 174,
      weigth: 75,
     // fk_userid:1
      group_id: 1
      /*
      createdAt: new Date(),
      updatedAt: new Date()*/
    },{
      name: 'Федор',
      surname: 'Федорович',
      email: 'fedor@mail.ru',
      sex: 'Мужчина',
      age: '26.11.1983',
      heigth: 166,
      weigth: 56,
     // fk_userid:2
      group_id: 2
      /*
      createdAt: new Date(),
      updatedAt: new Date()*/
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Participants', null, {});
  }
};
