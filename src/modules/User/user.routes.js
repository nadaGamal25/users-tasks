import express from 'express'
import { signinVal, signupVal } from './user.validation.js'
import { validate } from '../../middleware/validate.js'
import { signin, signup } from './user.controller.js'
import { checkEmailExist } from '../../middleware/checkEmailExist.js'
import { checkUsernameExist } from '../../middleware/checkUsernameExist.js'

const userRouter=express.Router()

userRouter.post('/signup',validate(signupVal),checkEmailExist,checkUsernameExist,signup)
userRouter.post('/signin',validate(signinVal),signin)

export default userRouter