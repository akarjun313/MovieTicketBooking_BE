import User from "../models/userModel.js";
import Theatre from "../models/theatreModel.js";
import { arrangement } from "../logic/seatArrangement.js";
import { timing } from "../logic/theatreTimings.js";
import Movie from "../models/movieModel.js";
import Shows from "../models/showlistModel.js";
import Seating from "../models/seatingModel.js";


// for owner 
export const showTheatres = async (req, res) => {
    const userId = await req.cookies.userId

    const findTheatres = await Theatre.find({ owner : userId })
    if(findTheatres.length === 0) return res.send("No theatres to display")

    res.send(findTheatres)
}


export const createTheatre = async (req, res) => {
    try {
        console.log("hitted on theatre creation")
        const { name, state, city, landmark, seatR, seatC, date, time } = req.body

        const userId = await req.cookies.userId
        console.log("owner id : ", userId) 
        if(!userId) return res.send("can't fetch user details")   
        

        const createNewTheatre = new Theatre({
            name,
            state,
            city,
            landmark,
            seatC,
            seatR,
            owner : userId
        })
        

        const newTheatre = await createNewTheatre.save()
        if(!newTheatre) return res.send("new theatre creation failed")
        
        const tName = newTheatre._id
        const seatArr = await arrangement(seatR, seatC, tName)
        const timeId = await timing(date, time, seatArr)

        const addSeat = await Theatre.findOneAndUpdate(
            { _id : newTheatre._id },
            { 
                seats : seatArr,
                timing : timeId
            }
        )
        if(!addSeat) return console.log("adding seat failed")
        if(!timeId) return console.log("adding time failed")

        return res.send("New theatre created successfully")
    } catch (error) {
        console.log("error in theatre creation ", error)
        return res.send("error")
    }
}


export const editTheatre = async (req, res) => {
    try {
        // theatre id 
        const {id} = req.params

        const { movieName, date, time } = req.body

        const findTheatre = await Theatre.findOne({ _id : id })

        if( findTheatre.status === false ) return res.send("Theatre must be approved by admin")

        // movie update 
        const findMovie = await Movie.findOne({ name : movieName })
        if(!findMovie) return res.send("can't find movie")
        const movieId = findMovie._id.toHexString()

        if(findMovie.status == "upcoming") return res.send("can't add this movie, movie has to be 'running'")

        // date & time update 
        const timeId = await timing(date, time)


        const updatedTheatreMovie = await Theatre.findOneAndUpdate(
            {_id : id},
            
            { movie : movieId }
        )

        const updatedTheatreTime = await Theatre.findOneAndUpdate(
            { _id : id },
            { $push : 
                { timing : 
                    { 
                        $each : [timeId],
                        $slice : -3
                    }
                }
            }
        )

        if(!updatedTheatreMovie) return res.send("Theatre updation failed(movie)")
        if(!updatedTheatreTime) return res.send("Theatre updation failed(Time)")

        console.log("Theatre updated")
        return res.send(updatedTheatreTime)
    } catch (error) {
        console.log("error in theatre updation ", error)
        res.send("Error in Theatre updation")
    }
}


export const deleteTheatre = async (req, res) => {
    const { id } = req.params

    

    await Seating.deleteMany({ theatre : id })
    console.log("deleted all seats")

    const findTheatre = await Theatre.findOne({ _id : id })
    for(let i=0; i<= findTheatre.timing.length; i++){
        await Shows.deleteOne({ _id : findTheatre.timing[i] })
    }
    console.log("deleted all show date & time")

    const TheatreDelete = await Theatre.deleteOne({_id : id})
    if(!TheatreDelete) return res.send("Error in theatre deletion")

    return res.send("Theatre deleted successfully").status(200)
}



// admin controls 

export const approveTheatre = async (req, res) => {
    try {
        const { id } = req.params

        const { status } = req.body

        const approveT = await Theatre.findByIdAndUpdate(
            { _id : id },
            { status }
        )

        if(!approveT) return res.send("failed, can't approve theatre")

        return res.send("theatre approved")
    } catch (error) {
        console.log("error in theatre approval", error)
        return res.send("error in theatre approval", error)
    }
}

// for admin 
export const getTheatres = async (req, res) => {
    const theatres = await Theatre.find()
    if(!theatres.length) return res.send("No theatres to list")
    res.send(theatres)
}

// get only one theatre info in detail (only admin) 
export const getaTheatre = async (req, res) => {
    try {
        // thetre id 
        const { id } = req.params

        const findTheatre = await Theatre.findOne({ _id : id })
        if(!findTheatre) return res.send("error, No theatre found")
        
        const ownerId = findTheatre.owner
        const showTimes = findTheatre.timing
        console.log(ownerId,showTimes)

        const findOwner = await User.findOne({ _id : ownerId })
        if(!findOwner) return res.send("error, can't find the owner")

        const findTiming = await Shows.findOne({ _id : showTimes })
        if(!findTiming) return res.send("error, unable to fetch theatre timings")


        res.send([findTheatre, findOwner.email, findTiming.date, findTiming.time])
    } catch (error) {
        console.log(error)
        return res.send("error in finding fetching one theatre")
    }
}



// for users 
// get theatres list according to movies played

export const theatreListofMovie = async (req, res) => {
    try {
        // movie id 
        const { id } = req.params

        const findTheatres = await Theatre.find({ movie : id })
        if(findTheatres.length === 0) return res.send("No theatres playing this movie")

        res.send(findTheatres)
    } catch (error) {
        console.log("error in showing theatre list of a movie", error)
        return res.send("error ", error)
    }
}