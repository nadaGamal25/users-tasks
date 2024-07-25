import Joi from 'joi'

const addTaskVal=Joi.object({
    title:Joi.string().min(2).max(150).required(),
    body:Joi.string().min(2).max(3000).optional(),
    listItems: Joi.array().items(Joi.object({
        textBody: Joi.string().min(1).max(200).optional()
      })).min(1).optional(),
    type:Joi.string().valid('text', 'list').required(),
    shared:Joi.string().valid('public', 'private').required(),
    user:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24).required(),
}).or('body','listItems')

const updateTaskVal=Joi.object({
    title:Joi.string().min(2).max(150),
    body:Joi.string().min(2).max(3000),
    listItems: Joi.array().items(Joi.object({
        textBody: Joi.string().min(0).max(200)
      })).min(0),
    type:Joi.string().valid('text', 'list'),
    shared:Joi.string().valid('public', 'private'),
    id:Joi.string().hex().length(24).required(),
})

const deleteTaskVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getTasksVal=Joi.object({
    page:Joi.number().min(1),
    limit:Joi.number().min(1),
})

const filterTaskSVal=Joi.object({
    shared:Joi.string().valid('public', 'private').required(),
})

export{
    addTaskVal,updateTaskVal,deleteTaskVal,getTasksVal,filterTaskSVal
}
