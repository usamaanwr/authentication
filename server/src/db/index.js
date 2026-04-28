import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MMONGODB_URI}`)
        console.log("MONGO DB IS CONNECTED !!!");
        
    } catch (error) {
        console.log("MONGO DB IS CONNECTION FAILED !!!" , error);
    }
}

export default connectDb