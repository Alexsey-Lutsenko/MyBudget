const Income = require('../models/Income')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.body.family) {
            const incomes = await Income.find({family: req.body.family})
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
    const income = new Income({
        sum: req.body.sum,
        user: req.user.id,
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