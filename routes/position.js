const express = require('express')
const passport = require('passport')
const controller = require('../controllers/position')
const router = express.Router()

router.get('/:family', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.patch('/order/:id', passport.authenticate('jwt', {session: false}), controller.updateOrder)

module.exports = router