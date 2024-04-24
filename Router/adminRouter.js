const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController')

router.get('/getUserData',adminController.getUserData)
router.post('/createUser',adminController.createUser)
router.delete('/deleteUser',adminController.deleteUser)
router.put('/updateUser',adminController.updateUser)


module.exports = router