const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    position: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    user: {
      ref: 'users',
      type: Schema.Types.ObjectId
    },
    userName: {
        type: String,
        required: true
    },
    family: {
        ref: 'families',
        type: Schema.Types.ObjectId
    },
    familyName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('outlay', orderSchema)