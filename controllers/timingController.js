// testing controller 

// import Shows from "../models/showlistModel.js"

// export const timing = async (req, res) => {
//     try {
//         const { date, time } = req.body

//         const newTiming = new Shows({
//             date,
//             time
//         })

//         const saveTime = await newTiming.save()
//         if(!saveTime) return res.send("error in saving time")

//         return res.send("Time saved")
//     } catch (error) {
//         console.log(error)
//     }
// }