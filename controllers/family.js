const Family = require('../models/Family')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.get = async function(req, res) {
    try {
        const families = await Family.find({'users.id': req.user.id})
        res.status(200).json(families)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const findFamily = await Family.find({'users.id' : req.user.id}).find({name: req.body.name})
    const nameUser = await User.findOne({_id : req.user.id})

    if (findFamily.length === 0) {
        const family = await new Family({
                name: req.body.name,
                users: [{
                    id: req.user.id,
                    name: nameUser.name,
                    admin: true
                    }
                ]
            })

            try {
                await family.save()
                res.status(201).json(family)
            } catch (e) {
                errorHandler(res, e)
            }
    } else  {
        res.status(409).json({
            message: 'Группа с таким именем уже существует, введите другое имя'
        })
    }
}

module.exports.addUser = async function (req, res) {
    const candidateEmail = await User.findOne({email: req.body.email})

    if (candidateEmail) {
        const candidate = await Family.find({'users.id': candidateEmail._id})
        const newUser = {
            users: [
                {
                    id: candidateEmail._id,
                    name: candidateEmail.name,
                    admin: false
                }
            ]
        }
        if (candidate.length === 0) {

            try {
                const family = await Family.findOneAndUpdate(
                    {_id: req.params.id},
                    {$push: newUser},
                    {new: true}
                )
                res.status(200).json(family)
            } catch (e) {
                errorHandler(res, e)
            }

        } else {
            res.status(409).json({
                message: 'Пользователь с таким email уже был добавлен ранее'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь с таким email не найден, вы не можете его добавить'
        })
    }
}

module.exports.reName = async function (req, res) {
    const updated = {
        name: req.body.name
    }
    try {
        const family = await Family.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(family)
    } catch (e) {
        errorHandler(res, e)
    }
}