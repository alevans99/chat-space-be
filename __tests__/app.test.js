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
          .then(({ body: { newRoomName, message, roomCount } }) => {
            expect(typeof(newRoomName)).toBe('string')
            expect(message).toBe('success')
            expect(roomCount).toBe(1)

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


  describe('/room/:roomname/:username', () => {
    describe('GET', () => {
      it('Should return true when the user is present in the room', () => {
        return request(app)
          .post('/room/create')
          .send({username: 'Test', clientId: '123'})
          .expect(200)
          .then(({ body: { newRoomName}}) => {
            return newRoomName
          }).then((newRoomName) => {
            return request(app).get(`/room/${newRoomName}/Test`)
          }).then(({ body: { status }}) => {
            expect(status).toBe(true)
          })
      })

      it('Should return false when the user is not present in the room', () => {
        return request(app)
          .post('/room/create')
          .send({username: 'Test', clientId: '123'})
          .expect(200)
          .then(({ body: { newRoomName}}) => {
            return newRoomName
          }).then((newRoomName) => {
            return request(app).get(`/room/${newRoomName}/wrong`)
          }).then(({ body: { status }}) => {
            expect(status).toBe(false)
          })
      })
    })

  describe('POST', () => {
    it('Should send an error message with 405 status', () => {
      return request(app)
        .post('/room/roomname/test')
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe('Method Not Allowed')
        })
    })
  })

  describe('PATCH', () => {
    it('Should send an error message with 405 status', () => {
      return request(app)
        .patch('/room/roomname/test')
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe('Method Not Allowed')
        })
    })
  })

  describe('DELETE', () => {
    it('Should send an error message with 405 status', () => {
      return request(app)
        .delete('/room/roomname/test')
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe('Method Not Allowed')
        })
    })
  })
})
})
