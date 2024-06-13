import express from 'express'
import { userSignup, userSignin } from '../controllers/userControllers.js'
import { getMovie, getSingleMovie } from '../controllers/movieControllers.js'
import authenticateUser from '../middlewares/userAuth.js'
import ownerRouter from './ownerRoutes.js'
import { addReview, deleteReview, editReview, showReviews } from '../controllers/reviewController.js'
import { theatreListofMovie } from '../controllers/theatreControllers.js'
// import { timing } from '../controllers/timingController.js'

const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    console.log("user router")
})

userRouter.use('/owner', ownerRouter)

// common to all 
userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)
// userRouter.post('/timing', timing)

userRouter.get('/movies', getMovie)
userRouter.get('/movie-reviews/:id', showReviews)
userRouter.get('/t-listofmovie/:id', theatreListofMovie)
userRouter.get('/movie/:id', getSingleMovie)


userRouter.post('/add-review/:id', authenticateUser, addReview)
userRouter.patch('/edit-review/:id', authenticateUser, editReview)
userRouter.delete('/rem-review/:id', authenticateUser, deleteReview)

// incomplete routes 
userRouter.get('/orders', authenticateUser)



export default userRouter