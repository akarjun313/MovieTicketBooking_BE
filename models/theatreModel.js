import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50
    },
    state : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50
    },
    city : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50
    },
    landmark : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50
    },
    seatR : {
        type : Number,
        required : true,
        min : 1,
        max : 15
    },
    seatC : {
        type : Number,
        required : true,
        min : 1,
        max : 20
    },
    status : {
        type : Boolean,
        required : true,
        default : false
    },
    seats : [{type : mongoose.Types.ObjectId, ref : "Seating"}],
    movie : {type : mongoose.Types.ObjectId, ref : "Movie"},
    owner : [{type : mongoose.Types.ObjectId, ref : "User"}],
    timing : [{type : mongoose.Types.ObjectId, ref : "Shows"}]
})

const Theatre = mongoose.model('Theatre', theatreSchema)
export default Theatre