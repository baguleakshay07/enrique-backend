const AppError = require('../AppError')
const M = require('../lib/messages')
const connection = require('../lib/ms')
const loggerName = '[AuthDao]'

const register = (options = {}) => {
    const methodName = loggerName + '[Register]'
    return new Promise(async (resolve, reject) => {
        try {
            if (!options.firstname) {
        return reject(new AppError(M.ERR_FIRSTNAME_REQUIRED, 'ERR_FIRSTNAME_REQUIRED'))
    }
    if (!options.lastname) {
        return reject(new AppError(M.ERR_LASTNAME_REQUIRED, 'ERR_LASTNAME_REQUIRED'))
    }
    if (!options.email) {
        return reject(new AppError(M.ERR_EMAIL_REQUIRED, 'ERR_EMAIL_REQUIRED'))
    }
    if (!options.password) {
        return reject(new AppError(M.ERR_PASSWORD_REQUIRED, 'ERR_PASSWORD_REQUIRED'))
    }
    /* if (!options.username) {
         return reject(new AppError(M.ERR_USERNAME_REQUIRED, 'ERR_USERNAME_REQUIRED'))
     }*/



    let insertRecord = await connection.query(`INSERT INTO users(firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
        [options.firstname, options.lastname, options.email, options.password])
    if (!insertRecord) {
        return reject(new AppError(M.ERR_RECORD_NOT_INSERTED, 'ERR_RECORD_NOT_INSERTED'))
    }
    return resolve(insertRecord)
} catch (err) {
        console.log(err)
        return reject(err)
    }
})
}
const login = (options = {}) => {
    const methodName = loggerName + '[Register]'
    return new Promise(async (resolve, reject) => {



        try {
            if (!options.email) {
        return reject(new AppError(M.ERR_EMAIL_REQUIRED, 'ERR_EMAIL_REQUIRED'))
    }
    if (!options.password) {
        return reject(new AppError(M.ERR_PASSWORD_REQUIRED, 'ERR_PASSWORD_REQUIRED'))
    }
    let sql="select * from users where email=? AND password = ?"
    /*let sql = 'SELECT * FROM users WHERE email = ? AND password = ?';*/
    const user=await connection.query(sql, [options.email, options.password],function (err, result) {

        if (!user) {
            return reject(new AppError(M.INCORRECT_USERNAME_PASSWORD, 'INCORRECT_USERNAME_PASSWORD'))
        }
        /* user = user.rows[0]*/
        return resolve(result)
    })


} catch (err) {
        console.log(err)
        return reject(err)
    }
})
}
module.exports.register = register
module.exports.login = login