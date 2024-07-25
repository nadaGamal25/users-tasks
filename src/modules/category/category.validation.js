import Joi from 'joi'

const addCategoryVal=Joi.object({
    name:Joi.string().min(2).max(150).required(),
    user:Joi.string().hex().length(24).required(),
})

const updateCategoryVal=Joi.object({
    name:Joi.string().min(3).max(150),
    id:Joi.string().hex().length(24).required(),
})

const deleteCategoryVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getcategoriesVal=Joi.object({
    page:Joi.number().min(1),
    limit:Joi.number().min(1),
})

const filterCategoryVal=Joi.object({
    name:Joi.string().min(2).max(150),
})
export{
    addCategoryVal,updateCategoryVal,deleteCategoryVal,getcategoriesVal,filterCategoryVal
}
