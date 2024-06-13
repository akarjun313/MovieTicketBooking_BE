import express from 'express'
import { createTheatre, deleteTheatre, editTheatre, showTheatres } from '../controllers/theatreControllers.js'
import { addMovie, getMovie } from '../controllers/movieControllers.js'
import authenticateOwner from '../middlewares/ownerAuth.js'


const ownerRouter = express.Router()

ownerRouter.get('/', (req, res)=>{
    console.log("Owner routes")
})

ownerRouter.get('/t-list', authenticateOwner, showTheatres)
ownerRouter.post('/t-add', authenticateOwner, createTheatre)
ownerRouter.delete('/t-rem/:id', authenticateOwner, deleteTheatre)
ownerRouter.patch('/t-edit/:id', authenticateOwner, editTheatre)

ownerRouter.patch('/add-mov/:id', authenticateOwner, addMovie)

ownerRouter.get('/movie-list', getMovie)


export default ownerRouter