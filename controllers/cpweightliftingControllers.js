var WeightLifting = require('../models/cpweightlifting');
var bodyParser = require('body-parser');

let createWeightlifting = (req,res) =>
{
    console.log(req.body);
    var newweightLifting = WeightLifting({
        sets: req.body.sets,
        repetitions:req.body.repetitions,
        percentaje: req.body.percentaje,
        weight:req.body.weight
    });
    newweightLifting.save().
    then
    (
        (newweightLifting)=>
        {
            res.status(200).send(newweightLifting); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let getWeightLifting = (req, res) =>
{      
    console.log("llegue a leer");
    WeightLifting.find(function(err,listWeightLifting)
    {
        
        res.status(200).send(listWeightLifting);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
   
  
};

let deleteWeightLifting = (req,res)=>
{
    let id = {idcpweightlifting: req.body.idcpweightlifting};
    WeightLifting.deleteOne(id, function(err)
    {
        res.status(200).send({estado:"Registro eliminado"});
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }      
    });
           
   
}

module.exports={createWeightlifting,getWeightLifting,deleteWeightLifting};