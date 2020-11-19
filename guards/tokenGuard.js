const M = require('../lib/messages')
const C = require('../lib/constants')
const httpStatus = require('http-status-codes')
const loggerName = '[TokenGuard]: '

const allowedList = [
  '/api/v1/currency',
]

const dynamicAllowedList = [
]

const urlChecker = (url) => {
  for (const allowedUrl of dynamicAllowedList) {
    if (url.indexOf(allowedUrl) > -1) {
      return true
    }
  }

  for (const allowedUrl of allowedList) {
    if (url === allowedUrl) {
      return true
    }
  }
}
