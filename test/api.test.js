// Third party imports
const chai = require('chai')
const chaiHttp = require('chai-http')

// Local imports
const server = require('../server')
const { errorLogger } = require('../utils/logger')
const { testUsers, testMusic } = require('./mockData')
const { setupFixtures, cleanup } = require('./testUtil')

const expect = chai.expect
chai.use(chaiHttp)

describe('==== Unit Tests ====', function () {
  describe('==== Health Check endpoint test ====', function () {
    it('Should test the health check route', (done) => {
      chai.request(server)
        .get(`/_health`)
        .end(async (err, res) => {
          if (err) {
            errorLogger('Error running health request', err)
          }
          expect(200)
          expect(res.body).to.an('object')
          expect(res.body).to.have.property('status')
          done()
        })
    })
  })

  describe('==== API endpoints test ====', function () {
    let fixtures
    beforeEach(async () => {
      fixtures = await setupFixtures(testUsers, testMusic)
    })
    afterEach(() => cleanup())

    it('GET music', (done) => {
      chai.request(server)
        .get('/music')
        .end((err, res) => {
          if (err) {
            errorLogger('Error adding music to user playlist', err)
          }
          expect(200)
          const response = res.body.music
          expect(response[0]).to.an('object')
          expect(response[0]).to.have.property('id')
          expect(response[0]).to.have.property('tags')
          expect(response[0]).to.have.property('updatedAt')
          expect(response[0]).to.have.property('createdAt')

          done()
        })
    })

    it('Create a new music record ', (done) => {
      chai.request(server)
        .post('/music')
        .send({ music: { tags: ['testTag1'] } })
        .end((err, res) => {
          if (err) {
            errorLogger('Error creating a user record', err)
          }
          expect(200)

          const response = res.body.response
          expect(response).to.an('object')
          expect(response).to.have.property('id')
          expect(response).to.have.property('tags')
          expect(response).to.have.property('updatedAt')
          expect(response).to.have.property('createdAt')

          done()
        })
    })

    it('Create a new user record ', (done) => {
      chai.request(server)
        .post('/user')
        .send({ user: { name: 'testUser' } })
        .end((err, res) => {
          if (err) {
            errorLogger('Error creating a user record', err)
          }
          expect(200)
          const response = res.body.response
          expect(response).to.an('object')
          expect(response).to.have.property('id')
          expect(response).to.have.property('name')
          expect(response).to.have.property('updatedAt')
          expect(response).to.have.property('createdAt')

          done()
        })
    })

    it('Add a follower to a user ', (done) => {
      const users = fixtures.usersData
      chai.request(server)
        .post('/follow')
        .send({ 'from': users[0].id, 'to': users[1].id })
        .end((err, res) => {
          if (err) {
            errorLogger('Error adding a follower to a user', err)
          }
          expect(200)
          const response = [].concat(...res.body.response)
          expect(response[0]).to.an('object')
          expect(response[0]).to.have.property('userId')
          expect(response[0]).to.have.property('followerId')
          expect(response[0]).to.have.property('updatedAt')
          expect(response[0]).to.have.property('createdAt')

          done()
        })
    })

    it('Add music to user playlist', (done) => {
      const users = fixtures.usersData
      const music = fixtures.musicData
      chai.request(server)
        .post('/listen')
        .send({ 'userId': users[0].id, 'musicId': music[0].id })
        .end((err, res) => {
          if (err) {
            errorLogger('Error adding music to user playlist', err)
          }
          expect(200)
          const response = [].concat(...res.body.response)
          expect(response[0]).to.an('object')
          expect(response[0]).to.have.property('userId')
          expect(response[0]).to.have.property('musicId')
          expect(response[0]).to.have.property('updatedAt')
          expect(response[0]).to.have.property('createdAt')

          done()
        })
    })

    it('GET user recommendation', (done) => {
      const user = fixtures.usersData[0]
      const music = fixtures.musicData[0]

      user.addPlayList(music.id)
        .then(() => {
          chai.request(server)
            .get(`/user/${user.id}/recommendations`)
            .end((err, res) => {
              if (err) {
                errorLogger('Error adding music to user playlist', err)
              }
              expect(200)
              const response = res.body
              expect(response.recommendation).to.an('array')
              expect(response.recommendation[0]).to.have.property('id')
              expect(response.recommendation[0]).to.have.property('tags')
              expect(response.recommendation[0]).to.have.property('createdAt')
              expect(response.recommendation[0]).to.have.property('updatedAt')

              done()
            })
        })
        .catch(error => { errorLogger('Error creating playlist', error) })
    })
  })
})
