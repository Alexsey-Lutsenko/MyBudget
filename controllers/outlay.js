const Outlay = require('../models/Outlay')
const User = require('../models/User')
const Family = require('../models/Family')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.params.family !== '000000000000000000000000') {
            const outlay = await Outlay.find({family: req.params.family}).sort({date: -1}).limit(50)
            res.status(200).json(outlay)
        } else  {
            const outlay = await Outlay.find({user: req.user.id}).sort({date: -1}).limit(50)
            res.status(200).json(outlay)
        }
    }   catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const user = await User.findOne({'_id': req.user.id})
        const family = await Family.findOne({'_id': req.body.family})

        const outlay = new Outlay({
            position: req.body.position,
            sum: req.body.sum,
            user: req.user.id,
            userName: user.name,
            family: req.body.family,
            familyName: family.name
        })

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


