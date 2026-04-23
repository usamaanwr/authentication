import express, { json } from "express"
import cors from "cors"
const app = express()
import dotenv from "dotenv"
import { userRouter } from "./routes/user.routes.js"
dotenv.config()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credential: true
}));
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))
app.use('/api/v1/user', userRouter)

export default app