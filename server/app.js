import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import { userRouter } from "./src/routes/user.routes.js"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit : "16kb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))
//routes 
app.use('/api/v1/user', userRouter)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Something went wrong!"
  return res.status(statusCode).json({
    success: false,
    message
  })
})
export default app