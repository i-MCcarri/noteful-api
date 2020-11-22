require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
// const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const notesRouter = require('./notes/notes-router')
const foldersRouter = require('./folders/folders-router')

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet());
app.use(cors());
// app.use(validateBearerToken)

app.use('/notes', notesRouter)
app.use('/folders', foldersRouter)

app.use(errorHandler);
app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})


app.get('/', (req, res) => {
  res.send('Hello, beautiful!');
});

module.exports = app;