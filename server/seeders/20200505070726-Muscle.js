module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Muscles', [{
        title: 'Плечи',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Бицепс',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Трицепс',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Широчайшие',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Предплечья',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Грудь',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Пресс',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Бедра',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Ягодицы',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Квадрицепсы',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Икры',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
      
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Muscles', null, {});
  }
};
