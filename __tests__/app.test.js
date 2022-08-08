const { describe } = require('yargs')
const app = require('../app')
const request = require('supertest')
describe('app.js', () => {
  describe('/api', () => {
    describe('GET', () => {
      it('should send a connected message with 200 status', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then(({ body: { message } }) => {
            expect(message).toBe('Connected to the API')
          })
      })
    })
  })
})
