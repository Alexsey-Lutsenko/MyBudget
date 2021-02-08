const express = require('express')
const controller = require('../controllers/family')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.get)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/add/:id', passport.authenticate('jwt', {session: false}), controller.addUser)
router.patch('/rename/:id', passport.authenticate('jwt', {session: false}), controller.reName)

module.exports = router