import express from 'express'
import { verifyToken } from '../../middleware/verifyToken.js'
import { validate } from '../../middleware/validate.js'
import { addTaskVal, deleteTaskVal, filterTaskSVal, getTasksVal, updateTaskVal } from './task.validation.js'
import { addTask, deleteTask, filterTaskShared, getTasks, updateTask } from './task.controller.js'


const taskRouter=express.Router()

taskRouter.post('/add',verifyToken,validate(addTaskVal),addTask)
taskRouter.put('/update/:id',verifyToken,validate(updateTaskVal),updateTask)
taskRouter.delete('/delete/:id',verifyToken,validate(deleteTaskVal),deleteTask)
taskRouter.get('/get-all',validate(getTasksVal), getTasks);
taskRouter.get('/filter',validate(filterTaskSVal), filterTaskShared);


export default taskRouter