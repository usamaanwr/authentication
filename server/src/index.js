import app from "../../server/src/app.js";
import connectDb from "../src/db/index.js";
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT
connectDb()

.then(()=>{
app.listen(port, ()=>{
    console.log(`server is start in running:${port}`);
})
})
.catch((err)=>{
    console.log("mongo db connection is failed");
})

