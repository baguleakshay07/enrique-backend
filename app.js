'use strict'
/* Main dependencies */
const express = require('express')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const httpStatus = require('http-status-codes')
const cookieParser = require('cookie-parser')

// require('./lib/io')
/* Register all routes */
const authRouter = require('./routes/authRouter')
const AppError = require('./AppError')
const app = express()
app.enable('trust proxy')

app.set('view engine', 'pug')
// default options
app.use(fileUpload({
  limits: {fileSize: 1 * 1024 * 1024}
}))

/* Express Router configrations */
const API = '/api/v1/'
app.use(require('sanitize').middleware)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: 1024102420, type: 'application/json'}))

app.use(API + 'auth', authRouter)

// error handler
app.use(function (err, req, res, next) {
  console.log('Error-400', err.status, err.message)
  if (err instanceof AppError) {
    return res.status(400).json({
      statusCode: err.status,
      statusText: err.message
    }).end()
  }
  console.error('[Handler]', err)
  return res.status(400).json({
    statusCode: 'BadRequest',
    statusText: 'Bad Request'
  })
})

console.log('[Server]', 'Server running in dev mode')

module.exports = app
