var BPDay = require('../models/bpworkofday');
var bodyParser = require('body-parser');
var bpworkout = require('../models/bpworkout');
const { query } = require('express');

let createDay = (req,res) =>
{
    console.log("Create day request: " + req.body);
    var newBPworkofday = BPDay({
        date: new Date(req.body.date),
        workouts: []
    });
    newBPworkofday.save().
    then
    (
        (newBPworkofday)=>
        {
            console.log("BPDay: " + newBPworkofday);
            res.status(200).send(newBPworkofday); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let getDay = (req, res) =>
{      
    console.log("llegue a leer");
    BPDay.find(function(err,listBPworkofday)
    {
        res.status(200).send(listBPworkofday);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });

       
  
};

let getWeekWorkouts = (req, res) =>
{      
    console.log("Get Week Workouts");
    console.log("query", req.query);

    let startDate = new Date(req.query.startDate);
    console.log("Start date", startDate);

    var endDate = new Date(req.query.endDate);
    console.log("End date", endDate);

    BPDay.find({ $and:[ { date: {$gte: startDate }}, { date: {$lte: endDate }} ]},function(err,dayList)
    {
        console.log("Days found",dayList);
        bpworkout.populate(dayList, { path: "workouts"} ,function(err, workouts)
        {
            if(err){
                console.log("Populate workouts has failed");
                res.status(500).send(err);
                console.log(err);
            }
            else{
                console.log("Days within workouts " + workouts);
                res.status(200).send(workouts);
            }            
        });
    });
};



let getDayWorkouts = (req, res) =>
{      
    BPDay.find(function(err,listBPworkofday)
    {
        bpworkout.populate(listBPworkofday, {path: "workouts"},function(err, listBPworkofday){
        res.status(200).send(listBPworkofday);
    });
    })
};

let deleteDay = (req,res)=>
{
    let id = {idworkofday: req.body.idworkofday};
    BPworkofday.deleteOne(id, function(err)
    {
        res.status(200).send({estado:"Registro eliminado"});
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }      
    });
           
   
}
module.exports={createDay,getDay,deleteDay,getDayWorkouts, getWeekWorkouts};