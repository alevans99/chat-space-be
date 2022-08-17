const request = require('supertest')
const app = require('../app')

describe('app.js', () => {

  describe('/room/create', () => {
      describe('GET', () => {
        it('Should send an error message with 405 status', () => {
          return request(app)
            .get('/room/create')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).toBe('Method Not Allowed')
            })
        })
      })

    describe('POST', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .post('/room/create', {username: 'Test', clientId: '123'})
          .expect(200)
          .then(({ body: { newRoomName, message } }) => {
            expect(typeof(newRoomName)).toBe('string')
            expect(message).toBe('success')
          })
      })
    })

    describe('PATCH', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .patch('/room/create')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('DELETE', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .delete('/room/create')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })
  })
})
