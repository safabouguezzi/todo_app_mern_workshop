const Task = require('../models/taskSchema')

const addTask = async (req, res) => {
    try {
        const {title, desc} = req.body
        const userId = req.userId
        const newTask = await Task.create({title, desc, owner: userId})
        res.status(201).json({msg: "task is created with success", task: newTask})
    } catch (error) {
        res.status(500).json({msg: "something went wrong", err: err.message})
    }
}

const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({owner: req.userId})
        res.status(200).json({msg: " get all tasks", tasks: tasks})

        
    } catch (error) {
        res.status(500).json({msg : "something went wrong", err: err.message})
    }
}

const deletetask = async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg: " task is deleted", task: task})

        
    } catch (error) {
        res.status(500).json({msg : "something went wrong", err: err.message})
    }
}


const updatetask = async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        res.status(200).json({msg: " task is deleted", task: {...task._doc, ...req.body}})

        
    } catch (error) {
        res.status(500).json({msg : "something went wrong", err: err.message})
    }
}

module.exports = { addTask, getTasks, updatetask, deletetask}