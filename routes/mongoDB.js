const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/signUpSchema')
.then(()=>{
    console.log("database connected");
})
.catch(()=>{
    console.log("databasenot connected");
})


const signUpSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    EmailID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
        
    })

    //const collection = new mongoose.model("collection1",signUpSchema)

    const collection = new mongoose.model("collection2",signUpSchema)

    module.exports=collection