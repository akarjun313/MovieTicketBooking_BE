import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import { adminToken } from "../utils/tokenGenerate.js"

export const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body

        const adminExist = await User.findOne({email})
        if(!adminExist){
            console.log("Admin not found")
            return res.send("Admin not found")
        }

        const matchPassword = await bcrypt.compare(password, adminExist.hashPassword)
        if(!matchPassword) {
            console.log("Incorrect password")
            return res.send("Incorrect password")
        }

        if(adminExist.role != "admin") return res.send("not an admin")
        
        const token = adminToken(adminExist)
        res.cookie("adtoken", token)
        res.send("Logged In")

    } catch (error) {
        console.log("error in admin sign-in :", error)
        return res.send("error : ", error)
    }
}

// admin logout 
export const adminLogout = async (req, res) => {
    res.clearCookie("adtoken")
    res.send("logged out")
}