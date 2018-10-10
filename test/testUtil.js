const models = require('../models')

const setupFixtures = async (users, music) => {
//   models.User.sync()
//   models.Music.sync()

  const usersData = await createTestUsers(users)
  const musicData = await createTestMusic(music)
  return {
    usersData,
    musicData
  }
}

const createTestUsers = async (users) => {
  await models.User.bulkCreate(users)
  const dbUsers = await models.User.findAll()
  return dbUsers
}

const createTestMusic = async (music) => {
  await models.Music.bulkCreate(music)

  const musicData = await models.Music.findAll()
  return musicData
}

const cleanup = async () => {
  await models.sequelize.sync({ force: true })
}

module.exports = {
  cleanup,
  setupFixtures
}
