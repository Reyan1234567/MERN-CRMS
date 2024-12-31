import mongoose from "mongoose"

const authenticationSchema=new mongoose.Schema({
    userID:{type:String, required:true},
    password:{type:String, required:true}
})

const Authentication=mongoose.model('authentication',authenticationSchema)

module.exports=Authentication