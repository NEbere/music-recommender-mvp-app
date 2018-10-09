'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { 
        id: 1, 
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      { 
        id: 2, 
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      { 
        id: 3, 
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
