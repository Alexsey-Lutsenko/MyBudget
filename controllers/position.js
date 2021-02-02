const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.body.family) {
            const positions = await Position.find({family: req.body.family})
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
    const position = new Position({
        name: req.body.name,
        user: req.user.id,
        family: req.body.family
    })
    try {
        await position.save()
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
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