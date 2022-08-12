const request = require('supertest')
const app = require('../app')

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

    describe('POST', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .post('/api')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('PATCH', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .patch('/api')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('DELETE', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .delete('/api')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })
  })
})
