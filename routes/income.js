const express = require('express')
const controller = require('../controllers/income')
const passport = require('passport')
const router = express.Router()

router.get('/:family', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)


module.exports = router