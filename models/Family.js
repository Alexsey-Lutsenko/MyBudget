const mongoose = require('mongoose')
const Schema = mongoose.Schema

const familySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            id: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            name: {
              type: String,
              required: true
            },
            admin: {
              type: Boolean,
              default: false
            }
        }
    ]
})

module.exports = mongoose.model('families', familySchema)
