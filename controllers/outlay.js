const Outlay = require('../models/Outlay')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.params.family) {
            const outlay = await Outlay.find({family: req.params.family})
            res.status(200).json(outlay)
        } else  {
            const outlay = await Outlay.find({user: req.user.id})
            res.status(200).json(outlay)
        }
    }   catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const outlay = new Outlay({
        position: req.body.position,
        sum: req.body.sum,
        user: req.user.id,
        family: req.body.family
    })
    try {
        await outlay.save()
        res.status(201).json(outlay)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await Outlay.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Данные о расходах были удалены'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}


