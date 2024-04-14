const express = require('express')
const app = express()
//require('express-async-errors')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
//const mongoUrl = process.env.TEST_MONGODB_URI
console.log(mongoUrl)
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch( (error) => console.log(error))


app.use(cors())
app.use(express.json())

app.use(middleware.errorHandler)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


module.exports = app