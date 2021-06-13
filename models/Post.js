const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    date: {
        type:Date,
        default: Date.now,
        require:false
    },
    workout: {
        type:Object,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model('Workouts',WorkoutSchema);