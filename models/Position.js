const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    family: {
        ref: 'families',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('positions', positionSchema)