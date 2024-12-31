import mongoose from "mongoose"

const driversSchema=new mongoose.Schema({
    driverID:{type:String, required:true},
    name:{type:String, required:true},
    licenseNumber:{type:String, required:true},
    phone:{type:String, required:true},
    email:{type:String, required:true},
    status:{type:String, required:true},
})

const Drivers=mongoose.model('Drivers', driversSchema)

module.exports=Drivers