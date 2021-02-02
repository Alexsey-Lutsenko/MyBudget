const mongoose = require('mongoose')
const Schema = mongoose.Schema

const familySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            user: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            admin: {
              type: Boolean,
              default: false
            }
        }
    ]
})

module.exports = mongoose.model('families', familySchema)
