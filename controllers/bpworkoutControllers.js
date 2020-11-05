var BPWorkout = require('../models/bpworkout');
var BPDay = require('../models/bpworkofday');
var bodyParser = require('body-parser');
var weightlifting = require('../models/cpweightlifting');

let createWorkout = (req,res) =>
{
    console.log(req.body);
    var newBpworkout = BPWorkout({

        wodType:req.body.wodType,
        workoutTime:req.body.workoutTime,
        userTime:req.body.userTime,
        workoutDescription:req.body.workoutDescription,
    });

    newBpworkout.save().
    then
    (
        (newBpworkout)=>
        {
            BPDay.findOneAndUpdate({"_id": req.body.dayID },{"$push": {"workouts": newBpworkout._id } },{new: true, safe: true, upsert: true }).then((result) => {
                return res.status(202).json({
                    status: "Success",
                    message: "workout successfull added to day",
                    data: result
                });
            }).catch((error) => {
                return res.status(500).json({
                    status: "Failed",
                    message: "Database Error",
                    data: error
                });
            });
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let getBPworkout = (req, res) =>
{      
    console.log("llegue a leer");
    BPWorkout.find(function(err,listBpWorkout)
    {
        res.status(200).send(listBpWorkout);
    });
};

let getWorkoutsForDay = (req, res) =>
{
    console.log("query " + req.query);
    
    BPDay.findOne({ _id : req.query.dayID },'workouts',function(err,dayResult)
    {
        console.log("User description " + userResult);
        BPWorkout.populate(dayResult, 'workouts' ,function(err, groups)
        {
            if(err){
                console.log("get user groups failed");
                res.status(500).send(err);
                console.log(err);
            }
            else{
                console.log("Group List " + groups);
                res.status(200).send(groups);
            }            
        });
    })
}

let getWorkoutCpWeightLifting = (req, res) =>
{      
    BPWorkout.find(function(err,listBpWorkout)
    {
        weightlifting.populate(listBpWorkout, {path: "weightLiftingSession"},function(err, listBpWorkout){
        res.status(200).send(listBpWorkout);
    });
    })
};

let deleteWeightLifting = (req,res)=>
{
    let id = {idbpworkout: req.body.idbpworkout};
    BPWorkout.deleteOne(id, function(err)
    {
        res.status(200).send({estado:"Registro eliminado"});
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }      
    });
}

module.exports={createWorkout,getBPworkout,getWorkoutCpWeightLifting,deleteWeightLifting};