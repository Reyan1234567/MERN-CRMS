import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
const app=express()
dotenv.config(); 

app.use(cors())
app.use(express.json())

connectDB();

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log("Server listening")
})

   
