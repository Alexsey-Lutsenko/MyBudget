const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const incomeRoutes = require('./routes/income')
const positionRoutes = require('./routes/position')
const orderRoutes = require('./routes/outlay')
const familyRoutes = require('./routes/family')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongo_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log('MongoDB crashed. ' + error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/income', incomeRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/outlay', orderRoutes)
app.use('/api/family', familyRoutes)

module.exports = app