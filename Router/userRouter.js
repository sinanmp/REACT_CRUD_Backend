const express = require('express')
const router = express()
const userController = require('../controller/userController')

router.post('/loginPost',userController.loginPost)
router.post('/signupPost',userController.signupPost)
router.get('/verifyUser',userController.verifyUser)
router.post('/imageUpdate',userController.imageUpdate)
router.get('/logoutUser',userController.logoutUser)

module.exports = router