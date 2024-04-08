const bcrypt = require('bcrypt')
const User = require('../models/user')
const {after, test, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



const helper = require('./test_helper')

describe('when creating a new user', () => {
  let newUser;
  beforeEach(async () => {
    await User.deleteMany({})
    newUser = {
      username: 'mikko1337',
      name: 'Mikko Mallikas',
      blogs: []
    }
  })

  test('no password returns 400', async () => {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
  })

  test('password of length 2 returns 400', async () => {
    newUser.password = "tw"

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    })

  test('password of length 3 succeeds', async () => {
    newUser.password = "thr"

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const n = await helper.usersInDb()
  assert.strictEqual(n.length, 1)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'PeikkoMuumi',
      name: 'Muumi Peikko',
      password: 'salattusalasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Olen Olemassa',
      password: 'salaviesti',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username is taken'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})  