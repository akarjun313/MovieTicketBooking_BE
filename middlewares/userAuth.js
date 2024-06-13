import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function authenticateUser(req, res, next){
    const token = req.cookies.token

    jwt.verify(token, process.env.SE, (err, user)=>{
        
        if(err){
            console.log(err)
            return res.status(400).send(err)
        } 
        
        req.user = user

        if(req.user.role !== "user") return res.send("User authentication failed")

        next()
    })
}

export default authenticateUser