import User from "../models/userModel.js";
import Theatre from "../models/theatreModel.js";
import Movie from "../models/movieModel.js";

export const getTheatres = async (req, res) => {
    const theatres = await Theatre.find()
    res.send(theatres)
}

export const createTheatre = async (req, res) => {
    try {
        const { name, state, city, landmark, seatRow, seatColumn, movieName } = req.body

        const findMovie = await Movie.findOne({ name : movieName})
        if(!findMovie) return res.send("Invalid movie name").status(400)
        
        // incomplete section
        const ownerName = await User.findOne({})
        // till here 

        const createNewTheatre = new Theatre({
            name,
            state,
            city,
            landmark,
            seatRow,
            seatColumn,
            movie : findMovie._id,
            owner : ownerName._id
        })

        const newTheatre = await createNewTheatre.save()
        if(!newTheatre) return res.send("new theatre creation failed")

        return res.send("New theatre created successfully")
    } catch (error) {
        console.log("error in theatre creation ", error)
        return res.send("error")
    }
}


export const editTheatre = async (req, res) => {
    try {
        const {id} = req.params

        const { name, state, city, landmark, seatRow, seatColumn, movieName } = req.body

        const updatedTheatre = await Theatre.findOneAndUpdate(
            {_id : id},
            { name, state, city, landmark, seatRow, seatColumn, movieName },
            {
                new : true
            }
        )

        if(!updatedTheatre) return res.send("Theatre updation failed")

        console.log("Theatre updated")
        return res.send(updatedTheatre)
    } catch (error) {
        console.log("error in theatre updation ", error)
        res.send("Error in Theatre updation")
    }
}


export const deleteTheatre = async (req, res) => {
    const {id} = req.params

    const TheatreDelete = await Theatre.deleteOne({_id : id})
    if(!TheatreDelete) return res.send("Error in theatre deletion")
    
    return res.send("Theatre deleted successfully").status(200)
}