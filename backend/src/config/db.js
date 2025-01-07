import mongoose from "mongoose";


const MONGO_URI="mongodb://localhost:27017/Polo"

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



