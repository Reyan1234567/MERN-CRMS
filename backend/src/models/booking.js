import mongoose from "mongoose"

const bookingSchema=new mongoose.Schema({
    bookingID:{type:String, required:true},
    vehicleID:{type:String, required:true},
    driverID:{type:String, required:true},
    startDate:{type:Date, required:true},
    endDate:{type:Date, required:true},
    totalPrice:{type:Number, required:true},
    status:{type:String, required:true}
})

const Booking=mongoose.model('booking', bookingSchema)

module.exports=Booking