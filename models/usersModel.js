'use strict'

const db = require('../lib/db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Users = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp_created: {
        type: Date,
        default: Date.now
    },
})

const model = db.model('Users', Users)
module.exports = model