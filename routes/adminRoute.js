import express from "express"
import { adminLogout, adminSignin } from "../controllers/adminController.js"
import { changeMovieStatus, createMovie, deleteMovie, getMovie } from "../controllers/movieControllers.js"
import { approveTheatre, getTheatres, getaTheatre } from "../controllers/theatreControllers.js"
import { getUsers } from "../controllers/userControllers.js"
import authenticateAdmin from "../middlewares/adminAuth.js"
import upload from "../middlewares/multerMiddleware.js"

const adminRouter = express.Router()

adminRouter.get('/',(req, res)=>{
    console.log("admin route")
})

adminRouter.post('/signin', adminSignin)
adminRouter.post('/logout', adminLogout)

// movie routes 
adminRouter.get('/movies', authenticateAdmin, getMovie)
adminRouter.post('/add-mov', authenticateAdmin, upload.single("image"), createMovie)
adminRouter.delete('/delete-mov/:id', authenticateAdmin, deleteMovie)
adminRouter.patch('/movie-status/:id', authenticateAdmin, changeMovieStatus)

// theatre routes 
adminRouter.get('/t-list', authenticateAdmin, getTheatres)
adminRouter.get('/t-info/:id', authenticateAdmin, getaTheatre)
adminRouter.patch('/approve-t/:id', authenticateAdmin, approveTheatre)

// user routes 
adminRouter.get('/user-list', authenticateAdmin, getUsers)


export default adminRouter