const Position = require('../models/Position')
const User = require('../models/User')
const Family = require('../models/Family')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.params.family !== '000000000000000000000000') {
            const positions = await Position.find({family: req.params.family})
            res.status(200).json(positions)
        } else  {
            const positions = await Position.find({user: req.user.id})
            res.status(200).json(positions)
        }
    }   catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await Position.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Данный пункт списка был удален'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const name = await Position.findOne({name: req.body.name})
    const user = await User.findOne({'_id': req.user.id})
    const family = await Family.findOne({'_id': req.body.family})
    if (name) {
        res.status(409).json({
            message: 'Такое поле уже было добавлено ранее'
        })
    } else {
        const position = new Position({
            name: req.body.name,
            userName: user.name,
            user: req.user.id,
            familyName: family.name,
            family: req.body.family,
            order: req.body.order
        })
        try {
            await position.save()
            res.status(201).json(position)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}


module.exports.update = async function(req, res) {
    const conflictName = await Position.findOne({family: req.body.family}).findOne({name: req.body.name})

    if (conflictName) {
        res.status(409).json({
            message: 'Такая позиция уже создана'
        })
    } else {
        const updated = {
            name: req.body.name
        }
        try {
            const position = await Position.findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
            )
            res.status(200).json(position)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.updateOrder = async function(req, res) {
    const updated = {
        order: req.body.order
    }
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}