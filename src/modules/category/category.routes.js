import express from 'express'
import { addCategory, deleteCategory, filterCategory, getCategories, updateCategory } from './category.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import { validate } from '../../middleware/validate.js'
import { addCategoryVal, deleteCategoryVal, filterCategoryVal, getcategoriesVal, updateCategoryVal } from './category.validation.js'

const categoryRouter=express.Router()

categoryRouter.post('/add',verifyToken,validate(addCategoryVal),addCategory)
categoryRouter.put('/update/:id',verifyToken,validate(updateCategoryVal),updateCategory)
categoryRouter.delete('/delete/:id',verifyToken,validate(deleteCategoryVal),deleteCategory)
categoryRouter.get('/get-all',validate(getcategoriesVal), getCategories);
categoryRouter.get('/filter',validate(filterCategoryVal), filterCategory);


export default categoryRouter
