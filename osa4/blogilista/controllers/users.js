const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  const users = await usersInDb()

  if (users.map(u => u.username).includes(username)) {
    return response.status(400).json({ error: 'username is taken' })
  }
  
  if (!password || password === undefined || password.length < 3) {
    return response.status(400).json({ error: 'password must exist and contain at least 3 characters' })
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    hashedPassword
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.
    find({}).populate('blogs')

  response.json(users)
})

module.exports = usersRouter