const express = require('express');
const router = express.Router()
const Post = require('../models/Post')
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


router.get('/',checkAuth,async(req,res)=>{
    
    try{
        const posts = await Post.find({userId:req.userData.userId})
        res.json(posts)
    }
    catch(err) {
        console.log(err)
        res.json({message:err})
    }
})

router.post('/',checkAuth,(req,res)=>{

    
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title:'test exercise',
        description: req.body.description,
        workout:req.body.session,
        userId:req.userData.userId,
        date:req.body.date
    })
    post.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message:err})
    })
})

router.delete('/:postId',checkAuth,async(req,res)=>{
    try{
        const posts = await Post.remove({_id: req.params.postId})
        res.json(posts)
    }
    catch(err) {
        console.log(err)
        res.json({message:err})
    }
})

router.patch('/:postId',checkAuth,async(req,res)=>{
    try{
        const post = await Post.updateOne({_id: req.params.postId},{$set: {title: req.body.title}})
        res.json(post)
    }
    catch(err) {
        console.log(err)
        res.json({message:err})
    }
})

module.exports = router;