var mongoose = require('mongoose');
var CPWeight = mongoose.model('CPWeight');
var  Schema = mongoose.Schema;
var BPWorkoutSchema = new Schema({
    idbpworkout:String,
    wodType:Number,
    workoutTime:Number,
    userTime:Number,
    workoutDescription:String,
    date: Date,
    weightLifttingExercise:String,
    weightLiftingSession:[
        { 
            type: Schema.ObjectId,
            ref: "CPWeight"
        }
    ]
});

var BPWorkout = mongoose.model('bpworkout',BPWorkoutSchema);
console.log("se creo modelo");
module.exports = BPWorkout;