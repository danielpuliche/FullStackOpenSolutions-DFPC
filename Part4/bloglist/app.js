const cors = require('cors')
const mongoose = require('mongoose')

const express = require('express')
const app = express()
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('Connected to MONGODB')
  })
  .catch((error) => {
    logger.error('Error connecting to MONGODB', error.message)
  })

// Middlewares

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
