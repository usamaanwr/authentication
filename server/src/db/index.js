import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDb = async ()=>{
    console.log("URI:", process.env.MONGODB_URI)
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MONGO DB IS CONNECTED !!!");
        return connectionInstance
        
    } catch (error) {
        console.log("MONGO DB IS CONNECTION FAILED !!!" , error);
        process.exit(1)
    }
}

export default connectDb