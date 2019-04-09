const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
})

module.exports = app => mongoose.model('Category', categorySchema)