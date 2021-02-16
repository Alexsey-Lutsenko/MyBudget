const mongoose = require('mongoose')
const Schema = mongoose.Schema

const incomeSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sum: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    familyName: {
        type: String,
        required: true
    },
    family: {
        ref: 'families',
        type: Schema.Types.ObjectID
    }
})

module.exports = mongoose.model('incomes', incomeSchema)