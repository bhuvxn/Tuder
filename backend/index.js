const mongoose = require("mongoose")
const express = require("express")
const usersModel = require("./models/users")
const app = express()
const  PORT = 3000
const dbUrl = "mongodb+srv://bhuvan:1234@cluster0.n2tcltq.mongodb.net/tuderuser?retryWrites=true&w=majority"



const connectionParams = {
    useNewUrlParser: true,
}

mongoose.connect(dbUrl, connectionParams).then(()=>{
    console.info("connected to db")
}).catch((e)=>{
    console.log("error", e)
})

app.listen(PORT,()=>{
    console.log('listening in PORT:${PORT}');
})

//route for adding new user to database

//route for searching according to param data from database
app.get("/search",(req,res)=>{
    usersModel.find({"subjects":{"$regex": "science"}})
    .then(data =>{
        res.send(data)
    })
})

//route for finding by user 


app.get("/read",(req,res)=>{
    usersModel.find((err,data)=>{
        if(err){
        return res.status(500).send(err)
        }else{
            return res.status(200).send(data)
        }
    })
})

//route for posting data into database