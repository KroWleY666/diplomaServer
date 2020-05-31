module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Muscles', [{
        title: 'Бицепс',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Шея',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Плечи',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Предплечья',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Пресс',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Трицепс',
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
      }]);
      
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Muscles', null, {});
  }
};
