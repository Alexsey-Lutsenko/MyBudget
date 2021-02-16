const Income = require('../models/Income')
const User = require('../models/User')
const Family = require('../models/Family')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.params.family !== '000000000000000000000000') {
            const incomes = await Income.find({family: req.params.family})
            res.status(200).json(incomes)
        } else  {
            const incomes = await Income.find({user: req.user.id})
            res.status(200).json(incomes)
        }
    }   catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const user = await User.findOne({'_id': req.user.id})
    const family = await Family.findOne({'_id': req.body.family})
    const income = new Income({
        sum: req.body.sum,
        userName: user.name,
        user: req.user.id,
        familyName: family.name,
        family: req.body.family
    })
    try {
        await income.save()
        res.status(201).json(income)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        sum: req.body.sum
    }
    try {
        const income = await Income.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(income)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await Income.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Данные о доходе были удалены'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}