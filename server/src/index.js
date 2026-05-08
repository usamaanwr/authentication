import app from "../../server/src/app.js";
import dotenv from "dotenv"
dotenv.config()
import connectDb from "../src/db/index.js";
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

