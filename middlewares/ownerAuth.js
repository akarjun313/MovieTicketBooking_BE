import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

async function authenticateOwner(req, res, next){
    const token = req.cookies.token

    jwt.verify(token, process.env.SE, (err, user)=>{
    
        if(err){
            console.log(err)
            return res.status(400).send(err)
        } 
        
        req.user = user 
        
        if(req.user.role !== "owner") return res.send("Owner authentication failed")

        next()
    })
}

export default authenticateOwner