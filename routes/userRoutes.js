import express from 'express'
import { userSignup, userSignin } from '../controllers/userControllers.js'
import { getMovie } from '../controllers/movieControllers.js'
import authenticateUser from '../middlewares/userAuth.js'

const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    console.log("user router")
})

// common to all 
userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)
userRouter.get('/movies', getMovie)

// incomplete routes 
userRouter.get('/orders', authenticateUser)
userRouter.post('add-review', authenticateUser)


export default userRouter