import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./src/db/index.js";


connectDb()

export default app  