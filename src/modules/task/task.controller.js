import { Task } from "../../../database/models/Task.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";


//Add  
const addTask=catchError(async(req,res)=>{
    let task =await Task.insertMany(req.body)
    res.status(201).json({message:'success',task})
})

//Update 
const updateTask = catchError(async (req, res, next) => {
    let task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
        return next(new AppError('Task not found', 404));
    }
   
    res.status(200).json({ message: 'Success', task });
});

//Delete
const deleteTask = catchError(async (req, res, next) => {
    let task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return next(new AppError('Task not found', 404));
    }
    
    res.status(200).json({ message: 'Success'});
});

//Get all tasks with pagination
const getTasks =catchError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments();

        const tasks = await Task.find().skip(skip).limit(limit);
        if (!tasks) {
            return next(new AppError('Task not found', 404));
        }
        res.status(200).json({
            message: 'success',
            totalTasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            tasks
        });
   
})

//Filtering By task shared option (Public/Private)
const filterTaskShared = catchError(async (req, res, next) => {
    const { shared } = req.query;
    if (!shared) {
        return next(new AppError('task option is required to search', 400));
    }

    const tasks = await Task.find({}).populate('user','name').populate('category','name')
    if (tasks.length === 0) {
        return next(new AppError('No tasks found', 404));
    }
    const filteredTasks = tasks.filter(task => 
        task.shared.toLowerCase().includes(shared.toLowerCase())
    );

    if (filteredTasks.length === 0) {
        return next(new AppError('No tasks found', 404));
    }

    res.status(200).json({ message: 'Success', filteredTasks });
});



export{
    addTask,updateTask,deleteTask,getTasks,filterTaskShared
}