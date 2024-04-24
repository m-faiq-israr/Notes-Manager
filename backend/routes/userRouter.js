const express = require('express')
const router = express.Router()
const {createUser, userLogin, userDetails} = require('../controller/userController')
const fetchuser = require('../middleware/fetchuser')


router.post('/createuser',createUser)

router.post('/login', userLogin)

router.post('/getuser',fetchuser, userDetails)



module.exports = router