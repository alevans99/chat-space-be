const request = require('supertest')
const createExpressApp = require('../app')
const createSocketServer = require('../socketServer')
const { MemoryStore } = require('../store/memoryStore')
const store = new MemoryStore()
const express = createExpressApp(store)
const app = createSocketServer(express, store)
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
          .post('/room/create', { username: 'CreateTest', clientId: '123' })
          .expect(200)
          .then(({ body: { newRoomName, message, roomCount } }) => {
            expect(typeof newRoomName).toBe('string')
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

  describe('/room/status/:roomName', () => {
    describe('GET', () => {
      it('Should respond with 200 and a true value when the room exists in the store', () => {
        return request(app)
          .post('/room/create')
          .send({ username: 'QueryTest', clientId: '123' })
          .expect(200)
          .then(({ body: { newRoomName } }) => {
            return newRoomName
          })
          .then((roomName) => {
            return request(app).get(`/room/status/${roomName}`)
          })
          .then(({ body: { status } }) => {
            expect(status).toBe(true)
          })
      })

      it('Should respond with 200 and a False value when the room does not exist in the store', () => {
        return request(app)
          .post('/room/create')
          .send({ username: 'QueryTest', clientId: '123' })
          .expect(200)
          .then(({ body: { newRoomName } }) => {
            return newRoomName
          })
          .then(() => {
            return request(app).get(`/room/status/wrong`)
          })
          .then(({ body: { status } }) => {
            expect(status).toBe(false)
          })
      })
    })

    describe('POST', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .post('/room/status/wrong')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('PATCH', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .patch('/room/status/wrong')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('DELETE', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .delete('/room/status/wrong')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })
  })

  describe('/user', () => {
    describe('POST', () => {
      it('Should return true when the user is present in the room', () => {
        return request(app)
          .post('/room/create')
          .send({ username: 'UserTest', clientId: '123' })
          .expect(200)
          .then(({ body: { newRoomName } }) => {
            return newRoomName
          })
          .then((roomName) => {
            return request(app)
              .post(`/user`)
              .send({ roomName, user: 'UserTest' })
          })
          .then(({ body: { status } }) => {
            expect(status).toBe(true)
          })
      })

      it('Should return false when the user is not present in the room', () => {
        return request(app)
          .post('/room/create')
          .send({ username: 'WrongUserTest', clientId: '123' })
          .expect(200)
          .then(({ body: { newRoomName } }) => {
            return newRoomName
          })
          .then((roomName) => {
            return request(app).post(`/user`).send({ roomName, user: 'absent' })
          })
          .then(({ body: { status } }) => {
            expect(status).toBe(false)
          })
      })
    })

    describe('GET', () => {
      it('Should send an error message with 405 status for Get/Patch/Delete', () => {
        return request(app)
          .get('/user')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('PATCH', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .patch('/user')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })

    describe('DELETE', () => {
      it('Should send an error message with 405 status', () => {
        return request(app)
          .delete('/user')
          .expect(405)
          .then(({ body: { message } }) => {
            expect(message).toBe('Method Not Allowed')
          })
      })
    })
  })
})
