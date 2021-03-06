const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Create Token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60*5})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова'
            })
        }
    } else  {
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // User already created
        res.status(409).json({
            message: 'Email уже занят, попробуйте другой.'
        })
    } else {
        // new User create
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            // Error handler
            errorHandler(res, e)
        }
    }
}

module.exports.getUser = async function(req, res) {
    try {
        const user = await User.findOne({'_id': req.user._id})
        res.status(200).json({
            id: user._id,
            name: user.name
        })
    } catch (e) {
        errorHandler(res, e)
    }
}