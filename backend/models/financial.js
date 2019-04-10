const mongoose = require('mongoose')

const Schema = mongoose.Schema

const financialSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = app => mongoose.model('Financial', financialSchema)
