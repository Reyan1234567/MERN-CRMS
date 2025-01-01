import mongoose from "mongoose"

const driversSchema=new mongoose.Schema({
    driverID:String,
    name:String,
    licenseNumber:String,
    phone:String,
    email:String,
    status:Boolean
})

const Drivers=mongoose.model('Drivers', driversSchema)

export default Drivers