const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const { rawListeners } = require('../models/User');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth');
require('dotenv/config');
const user = require('../models/User')

router.post("/signup",(req,res,next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length>=1){
            return res.status(409).json({
                message: 'email already exists'
            })
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if (err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User(({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        sex:req.body.male,
                        email: req.body.email,
                        password: hash,
                        birthdate: req.body.age,
                        weight: req.body.weight
                    }))
                    user
                    .save()
                    .then(result =>{
                        res.status(201).json({
                            message: 'User created'
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
    
})

router.post('/login',(req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if (err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if (result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: 'Auth Succefull',
                    token: token,
                    user:user
                })
            }
            return res.status(401).json({
                message: 'Auth failed'
            })
        })

    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

router.get('/',checkAuth,async(req,res)=>{
    
    try{
        const user = await User.find({_id:req.userData.userId})
        res.json(user)
    }
    catch(err) {
        console.log(err)
        res.json({message:err})
    }
})

router.delete('/deteteuser',(req,res,next) =>{
    User.remove({_id: req.body.id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'deleted'
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;
