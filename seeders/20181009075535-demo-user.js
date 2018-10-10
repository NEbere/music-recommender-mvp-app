'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
        // id: 1,
        name: 'Johe',
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 2,
        name: 'Doe',
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 3,
        name: 'Foo',
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {})
  }
}
