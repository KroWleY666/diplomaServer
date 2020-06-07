module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Muscles', [
        { title: 'Плечи' },
        { title: 'Бицепс' },
        { title: 'Трицепс' },
        { title: 'Широчайшие' },
        { title: 'Предплечья' },
        { title: 'Грудь' },
        { title: 'Пресс' },
        { title: 'Бедра' },
        { title: 'Ягодицы' },
        { title: 'Квадрицепсы' },
        { title: 'Икры' }
      ]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Muscles', null, {});
  }
};
