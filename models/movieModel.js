import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        minLength : 1,
        unique : true
    },
    description : {
        type : String,
        minLength : 5,
        maxLength : 100
    },
    genre : {
        type : String,
        required : true,
        minLength : 3,
    },
    language : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 30 
    },
    duration : {
        type : Number,
        required : true,
    },
    image : {
        type : String
    },
    status : {
        type : String,
        enum : ["running", "upcoming"],
        required : true,
        default : "running"
    }
},{ timestamps : true })

const Movie = mongoose.model('Movie', movieSchema)
export default Movie