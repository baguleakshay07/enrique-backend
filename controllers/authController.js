'use strict'
const sha512 = require('js-sha512').sha512
const httpStatus = require('http-status-codes')
const C = require('../lib/constants')
const M = require('../lib/messages')
const authDao = require('../dao/authDao')
const loggerName = '[AuthController]'

/**
 * Function registers new user
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {statusCode, statusText}
 *
 * @param {String} req.body.firstname
 * @param {String} req.body.lastname
 * @param {String} req.body.email
 * @param {String} req.body.password
 * @param {String} req.body.rpassword
 * @param {Boolean} req.body.agree
 */
module.exports.signup = async (req, res, next) => {
    const methodName = loggerName + '[SignUp]'
    let firstname = req.bodyString('firstname')
    let lastname = req.bodyString('lastname')
    let password = req.bodyString('password')
    const email = req.bodyEmail('email')

    /*const username = req.bodyString('username')*/


    try {
        const firstLetterFirstName = firstname.substr(0, 1)
        firstname = firstLetterFirstName.toUpperCase() + firstname.substr(1)
        const firstLetterLastName = lastname.substr(0, 1)
        lastname = firstLetterLastName.toUpperCase() + lastname.substr(1)
        password = password
        const register = await authDao.register({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password:password
        })
        return res.status(200).json({
            statusText: 'Registration done successfully',
            StatusCode: M.SUCCESS
        })
    } catch (err) {
        console.error(methodName, err)
        return next(err)
    }
}

/**
 * Function checks username and password (Login)
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 *
 * @param {String} req.body.email
 * @param {String} req.body.password
 */
module.exports.login = async (req, res, next) => {
    const methodName = loggerName + '[Login]'
    try {

        let email = req.bodyEmail('email')
        let password = req.bodyString('password')
        if(!email){
            return res.status(400).json({
                statusText: 'ERR_EMAIL_REQUIRED',
                statusCode: M.ERR_EMAIL_REQUIRED
            })
        }
        if(!password){
            return res.status(400).json({
                statusText: 'ERR_PASSWORD_REQUIRED',
                statusCode: M.ERR_PASSWORD_REQUIRED
            })
        }
        const user = await authDao.login({
            email: email,
            password: password
        })

        return res.status(200).send(user[0])
    } catch (err) {
        console.error(methodName, err)
        return next(err)
    }
}
