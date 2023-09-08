const express = require('express')
const router = express.Router()

const { addTask, getTasks , updatetask, deletetask} = require('../controllers/taskController')
const authMiddleware = require("../middlewares/authMiddleware")


router.post('/newTask', authMiddleware, addTask)
router.get('/getusertasks', authMiddleware, getTasks)
router.delete('/deletetask/:id', authMiddleware,  deletetask)
router.put('/updatetask/:id', authMiddleware, updatetask)
module.exports = router