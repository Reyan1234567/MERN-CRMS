import express from "express"
import connectDB from "./config/db"
import {ObjectId} from 'mongodb'


const router=express.Router()

//getting all the vehicles
router.get("/", async(req,res)=>{
    let collection=await db.collection("vehilces")
    let result=await collection.find({}).toArray()
    res.send(result).status(200)
})

//getting one vehicle
router.get("/:id",async(req,res)=>{
    let collection=await db.collection("vehilces")
    let query={_id: new ObjectId(req.params.id)}
    let result=await collection.findOne(query)
    if(!result) res.send("Not found").status(404)
    else res.send(result).status(200)
})

//create
router.post("/",async(req,res)=>{
    try{
        let newVehicle={
            vehicleID:req.body.vehicleID,
            licensePlate:req.body.licensePlate,
            make:req.body.make,
            year:req.body.year,
            mileage:req.body.mileage,
            isOccupied:req.body.isOccupied,
            rentalPricePerDay:req.body.rentalPricePerDay

        };
        let collection=await db.collection("records");
        let result= await collection.insetOne(newvehicle);
        res.send(result).status(204);
    }
    catch(err){
        console.log(err)
        res.status(500).send("Error adding record")
    }
})

router.patch("/:id",async (req,res)=>{
    try{
        const query ={_id: new ObjectId(req.params.id)}
        const updates={
            $set:{
                vehicleID:req.body.vehicleID,
            licensePlate:req.body.licensePlate,
            make:req.body.make,
            year:req.body.year,
            mileage:req.body.mileage,
            isOccupied:req.body.isOccupied,
            rentalPricePerDay:req.body.rentalPricePerDay
            }
        }
        let collection=await db.collection("records");
        let result=await collection.updateOne(query, updates)
        res.send(result).status(200);
    } 
    catch(err){
        console.log(err);
        res.status(500).send("Error updating record")
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const query={_id: new ObjectId(req.params.id)};
        const collection=await db.collection("records");
        let result=await collection.deleteOne(query)

        res.send(result).status(200);}
    catch(err){
        console.error(err);
        res.status(500).send("Error deleting record")
    }
})

export default router;