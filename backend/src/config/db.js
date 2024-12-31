import mongoose from "mongoose";


const MONGO_URI="mongodb+srv://reyann11b:2vJBSrd3nTPPpKQ6@polo.m5eut.mongodb.net/Polo"

const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('MongoDB connected succesfully!')
    }
    catch(error){
        console.log('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

export default connectDB;



