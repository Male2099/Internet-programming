
const mongoose = require('mongoose');

module.exports=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/TP09DB").then(()=>{
            console.log("MongooDB connected");
        })
    }catch(err){
        console.log("mongoose: "+err);
    }
}
