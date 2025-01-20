import mongoose from "mongoose"

const bookingSchema=new mongoose.Schema({

    bookingID:String, 
    vehicleID:String, 
    driverID:String, 
    startDate:Date, 
    endDate:Date, 
    status:String
})

const Booking=mongoose.model('Booking', bookingSchema)

export default Booking