const express = require('express')
const passport = require('passport')
const controller = require('../controllers/outlay')
const router = express.Router()

router.get('/:family', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router