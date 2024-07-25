process.on('uncaughtException',(err)=>{
    console.log('error in code',err)
})
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { globalError } from './src/middleware/globalError.js'
import dotenv from 'dotenv';
import userRouter from './src/modules/User/user.routes.js'
import categoryRouter from './src/modules/category/category.routes.js'
import taskRouter from './src/modules/task/task.routes.js'

dotenv.config();
const port = process.env.PORT || 3000;
const app =express()
app.use(express.json())

app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/task',taskRouter)



app.use('*',(req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`,404))
})    

app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log('error outside express',err)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))