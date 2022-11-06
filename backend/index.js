const mongoose = require("mongoose")
const express = require("express")
const usersModel = require("./models/users")
const app = express()
const PORT = 5000
const dbUrl = "mongodb+srv://bhuvan:1234@cluster0.n2tcltq.mongodb.net/tuderuser?retryWrites=true&w=majority"
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}));

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

//route for searching for users with certain subjects from database
app.get("/searchBySearch",(req,res)=>{
    // Use regex to find subject within the subject string
    usersModel.find({"subjects":{"$regex": req.body.subjects}})
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send(err)
    })
})

//route for finding if a user exists, if yes, return the user
app.get("/searchForUser",(req,res)=>{
    usersModel.find({"user" : {"$regex": req.body.user}})
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send(err)
    })
})

app.get("/read",(req,res)=>{
    usersModel.find((err,data)=>{
        if(err){
        return res.status(500).send(err)
        }else{
            return res.status(200).send(data)
        }
    })
})

// Checks for duplicate emails, if no dupe, create new user instance and save to database
app.post('/signup', function(req,res,next){

    usersModel.findOne({email: req.body.email})
    .exec((err, email) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (email) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        if (req.body.email === ""){
            res.status(400).send({ message: "Failed! No Email Inputted" });
            return;
        }
        if (req.body.password === ""){
            res.status(400).send({ message: "Failed! No Password Inputted" });
            return;
        }
    
        var userInserted = new usersModel({
            user: req.body.user,
            email: req.body.email,
            password: req.body.password,
            rating: "0",
            num_of_ratings: "0",
            subjects: ","

        })

    

        userInserted.save(function(err,post){
            
            if(err){return next (err)}
            res.json(201, post)
        })
    })
})

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

app.post('/signin', function(req,res){
    // Find user by email (Assumes that email will be in database for now)
    usersModel.findOne({email: req.body.email})
    .then(function(account){
        if (account.password != req.body.password){
            res.status(400).send({message: "Failed! Invalid Password"});
            return
        }
        else{
            return res.status(200).send(account);
        }
    })  
    .catch(function(err, account){
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!account) {
            res.status(400).send({ message: "Failed! Invalid Email!" });
            return;
        }
    });
});

// Updates the rating of the user (req will have a new rating field)
app.post('/update_rating', function(req,res, next){
    // Find user by email (Assumes that email will be in database for now)
    usersModel.findOne({email: req.body.email})
    .then(function(account){
        var cur_rating = parseFloat(account.rating);
        var cur_num_of_ratings = parseFloat(account.num_of_ratings);
        // Get the new rating, recalcuate the average rating
        var cur_rating = cur_rating*cur_num_of_ratings + req.body.rating;
        cur_num_of_ratings++;

        // New Rating 
        var cur_rating = rating/cur_num_of_ratings;

        // Update Mongoose Model
        account.rating = toString(cur_rating);
        account.num_of_ratings = toString(cur_num_of_ratings);

        account.markModified('rating');
        account.markModified('num_of_ratings');

        account.save(function(err,post){
            
            if(err){return next (err)}
            res.json(201, post)
        })
    }) 
    .catch(function(err, account){
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!account) {
            res.status(400).send({ message: "Failed! Invalid Email!" });
            return;
        }
    });
});



//route for posting data into database