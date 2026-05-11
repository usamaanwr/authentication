import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./db/index.js";


connectDb()

export default app  