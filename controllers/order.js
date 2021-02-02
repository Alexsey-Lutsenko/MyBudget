const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        if (req.body.family) {
            const orders = await Order.find({family: req.body.family})
            res.status(200).json(orders)
        } else  {
            const orders = await Order.find({user: req.user.id})
            res.status(200).json(orders)
        }
    }   catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const order = new Order({
        position: req.body.position,
        sum: req.body.sum,
        user: req.user.id,
        family: req.body.family
    })
    try {
        await order.save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        await Order.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Данные о расходах были удалены'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}


