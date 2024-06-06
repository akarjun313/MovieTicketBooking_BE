import express from 'express'
import { connectDb } from './config/db.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'


const app = express()
const port = 3210

// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)

// db connection 
connectDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})