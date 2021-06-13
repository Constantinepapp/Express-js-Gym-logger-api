const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');

///import routes
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use('/posts',postsRoute)
app.use('/user',userRoute)



mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true ,useUnifiedTopology: true },()=>{
    console.log("connected")
})
//Middleware//


/////
app.listen(3000);

app.get("/",(req,res) =>{
    res.send("We are on home");
})

app.get("/posts",(req,res) =>{
    res.send("We are on posts");
})