const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const incomeRoutes = require('./routes/income')
const positionRoutes = require('./routes/position')
const orderRoutes = require('./routes/order')
const app = express()

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/income', incomeRoutes)
app.use('/api/consumption', positionRoutes)
app.use('/api/order', orderRoutes)

module.exports = app