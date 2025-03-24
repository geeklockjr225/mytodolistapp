const {Task} = require('../models')


exports.createTask = async (req,res) => {
    const {title} = req.body
    const task = await Task.create({title,completed:false,userId: req.userId})
    res.json(task)
}


exports.getTasks= async (req,res) => {
    const tasks = await Task.findAll({where : {userId: req.userId}})
    res.json(tasks)
}