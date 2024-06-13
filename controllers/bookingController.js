import Shows from "../models/showlistModel.js"
import Theatre from "../models/theatreModel.js"


// show available seats before booking 
export const chooseSeat = async (req, res) => {
    try {

        // fetching theatre_id, date & time
        const { theatre, date, time } = req.body

        const findTheatre = await Theatre.findOne({ _id : theatre })

        let gotDayId = ""
        for(let i=0; i<=findTheatre.timing; i++){
            const showId = findTheatre.timing[i]
            console.log(showId)
            const findDate = await Shows.findOne({ _id : showId })
            if(findDate.date == date){
                gotDayId = findDate
                break;
            }
        }
        if(gotDayId === "") return res.send("error, can't fetch date & time")

            
        const findDate 
    } catch (error) {
        
    }
}