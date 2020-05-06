'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [{
      title: 'КИ16-17',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'ЦМ12-08', 
      user_id: 1,     
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
