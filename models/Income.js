const mongoose = require('mongoose')
const Schema = mongoose.Schema

const incomeSchema = new Schema({
    sum: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('incomes', incomeSchema)