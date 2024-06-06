import { cloudinaryInstance } from "../config/cloudinary.js";
import Movie from "../models/movieModel.js";
// import User from "../models/userModel.js";


export const getMovie = async (req, res) => {
    const movies = await Movie.find()
    res.send(movies)
}

export const createMovie = async (req, res) => {
    try {
        if (!req.file) {
            console.log("no file uploaded")
            return res.status(400).json({ success: false, message: "No file uploaded" })
        }
        console.log("File upload successful, moving to cloudinary")

        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if(err){
                console.log("error", err)
                return res.status(400).json({success : false, message: "Error"})
            }

            const imageUrl = result.url

            const { name, description, genre, language, duration } = req.body

            const createNewMovie = new Movie({
                name,
                description,
                genre,
                language,
                duration,
                image : imageUrl
            })

            const newMovie = await createNewMovie.save()
            if(!newMovie) return res.send("new movie not created")

            return res.send("New movie created")
        })

    } catch (error) {
        console.log("error in movie creation", error)
        res.send("error in movie creation")
    }
}

export const deleteMovie = async (req, res) => {
    const {id} = req.params
    const deletedMovie = await Movie.deleteOne({_id: id})
    if(!deletedMovie) return res.send("Movie deletion failed")
    
    console.log("Movie deleted")
    res.send("Movie deleted successfully")
}