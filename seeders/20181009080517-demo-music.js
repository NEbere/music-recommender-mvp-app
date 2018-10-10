'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Music', [
      {
        // id: 1,
        tags: ['jazz', 'old school', 'instrumental'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 2,
        tags: ['samba', '60s'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 3,
        tags: ['rock', 'alternative'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 4,
        tags: ['rock', 'alternative'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 5,
        tags: ['folk', 'instrumental'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 6,
        tags: ['60s', 'rock', 'old school'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 7,
        tags: ['alternative', 'dance'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 8,
        tags: ['electronic', 'pop'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 9,
        tags: ['60s', 'rock'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 10,
        tags: ['60s', 'jazz'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 11,
        tags: ['samba'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      },
      {
        // id: 12,
        tags: ['jazz', 'instrumental'],
        createdAt: '2018-10-09',
        updatedAt: '2018-10-09'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Music', null, {})
  }
}
