import express from 'express'
import { createTheatre, deleteTheatre, editTheatre, getTheatres } from '../controllers/theatreControllers.js'
import { getMovie } from '../controllers/movieControllers.js'
import authenticateOwner from '../middlewares/ownerAuth.js'


const ownerRouter = express.Router()

ownerRouter.get('/', (req, res)=>{
    console.log("Owner routes")
})

ownerRouter.get('/t-list', authenticateOwner, getTheatres)
ownerRouter.post('/t-add', authenticateOwner, createTheatre)
ownerRouter.delete('/t-rem', authenticateOwner, deleteTheatre)
ownerRouter.put('/t-edit', authenticateOwner, editTheatre)

ownerRouter.get('/movie-list', getMovie)


export default ownerRouter