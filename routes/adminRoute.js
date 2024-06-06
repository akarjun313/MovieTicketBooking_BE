import express from "express"
import { adminSignin } from "../controllers/adminController.js"
import { createMovie, deleteMovie, getMovie } from "../controllers/movieControllers.js"
import { getTheatres } from "../controllers/theatreControllers.js"
import { getUsers } from "../controllers/userControllers.js"
import authenticateAdmin from "../middlewares/adminAuth.js"

const adminRouter = express.Router()

adminRouter.get('/',(req, res)=>{
    console.log("admin route")
})

adminRouter.post('/signin', adminSignin)

adminRouter.get('/movies', authenticateAdmin, getMovie)
adminRouter.post('/add-mov', authenticateAdmin, createMovie)
adminRouter.delete('/delete-mov', authenticateAdmin, deleteMovie)

adminRouter.get('/t-list', authenticateAdmin, getTheatres)

adminRouter.get('/user-list', authenticateAdmin, getUsers)


export default adminRouter