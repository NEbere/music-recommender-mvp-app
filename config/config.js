const Sequelize = require('sequelize')
module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'happiness',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'routific',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    logging: false,
    debug: true
  },

  test: {
    username: process.env.DB_USERNAME || 'happiness',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    logging: false
  },

  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op
  }
}
