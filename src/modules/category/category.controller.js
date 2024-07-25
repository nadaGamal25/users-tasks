import { Category } from "../../../database/models/category.model.js";
import { Task } from "../../../database/models/Task.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";


//Add  
const addCategory=catchError(async(req,res)=>{
    let category =await Category.insertMany(req.body)
    res.status(201).json({message:'success',category})
})

//Update 
const updateCategory = catchError(async (req, res, next) => {
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
   
    res.status(200).json({ message: 'Success', category });
});

//Delete
const deleteCategory = catchError(async (req, res, next) => {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    // Delete all jobs related to the Category
    await Task.deleteMany({ category: req.params.id });
    res.status(200).json({ message: 'Success'});
});

//Get all tasks with pagination
const getCategories =catchError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalCategories = await Category.countDocuments();

        const categories = await Category.find().skip(skip).limit(limit);
        if (!categories) {
            return next(new AppError('Category not found', 404));
        }
        res.status(200).json({
            message: 'success',
            totalCategories,
            currentPage: page,
            totalPages: Math.ceil(totalCategories / limit),
            categories
        });
   
})

//Filtering By Category Name
export const filterCategory = catchError(async (req, res, next) => {
    const { name } = req.query;
    if (!name) {
      return next(new AppError('Category name is required to search', 400));
    }
  
    const categories = await Category.find({ name: { $regex: name, $options: 'i' } }).populate('user');
  
    if (categories.length === 0) {
      return next(new AppError('No category found with the given name', 404));
    }
  
    const categoriesWithTasks = await Promise.all(categories.map(async category => {
      const tasks = await Task.find({ category: category._id }).populate('user');
      return { ...category.toObject(), tasks };
    }));
  
    res.status(200).json({ message: 'Success', categories: categoriesWithTasks });
  });


export{
    addCategory,updateCategory,deleteCategory,getCategories
}