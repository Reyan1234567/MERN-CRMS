import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            userNewUrlParser:true,
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



