var User = require('../models/bpuser');
var bodyParser = require('body-parser');


let getUsers = (req, res) =>
{      
    console.log("llegue a leer");
    User.find(function(err,listUsers)
    {

        res.status(200).send(listUsers);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
           
};

let loginUser = (req, res) =>
{   
    console.log("Login user");
    User.findOne({mail:req.body.mail,password:req.body.password},function(err,results)
    {
        if(err){
            res.status(500).send(err);
            console.log(err);
        }
        else{
            res.status(200).send(results);  
            console.log(results);    
        }
    });
    
}

let getContactosByname = (req, res) =>
{   
    let name1 = {name:req.body.name};
    User.find(name1,function(err,results)
    {
        if(err){
            res.status(500).send(err);
            console.log(err);
        }
        else{
            res.status(200).send(results);  
            console.log(results);    
        }
    });
    
}

let searchUserbyKey = (req, res) =>
{   
    console.log(req.query.key);    
    let name = {name: {'$regex' : '.*(?i)' + req.query.key + '.*'}};  
    let lastname = {lastname: {'$regex' : '.*(?i)' + req.query.key + '.*'}};
    User.find({$or:[name,lastname]},function(err,results)
    {
        if(err){
            res.status(500).send(err);
            console.log(err);
        }
        else{
            res.status(200).send(results);  
            console.log(results);    
        }
    });   
}

let createUser = (req,res) =>
{
    console.log("Create user");
    console.log(req.body);
    var newContact = User({
        name: req.body.name,
        lastname:req.body.lastname,
        mail: req.body.mail,
        groupsID: [],
        groupsAdmin: []
    });
    newContact.save().
    then
    (
        (newContact)=>
        {console.log(newContact);
            res.status(200).send(newContact); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let registerUserWithSocialCredentials = (req,res) =>
{
    console.log("register user with social credentials");
    console.log("request: " +  req.body.mail);
    User.findOne({mail: req.body.mail},function(err,results) {
        if(err) {
            res.status(500).send(err);
            console.log(err);

        } else {

            if(results != null) {
                console.log("user has been found");
                res.status(200).send(results);  
                console.log(results);   
            } else {
                console.log("user doesn't exist");
                var newContact = User({
                name: req.body.name,
                lastname: req.body.lastName,
                mail: req.body.mail,
                groupsID: [],
                groupsAdmin: []
                });

                newContact.save().
                then
                (
                    (newContact)=>
                    {console.log(newContact);
                        res.status(200).send(newContact); 
                    },
                    (err)=>
                    { 
                        res.status(500).send(err);
                        console.log(err);
                    }
                )
            } 
        }
    });
}

let updateUser = (req,res) => 
{
    let id = {iduser: req.body.iduser};
   
    console.log("update",id);
    User.findOneAndUpdate({ iduser : req.body.iduser},{$set : {name: req.body.name}},{new:true},function(err)
    {
       res.status(200).send({estado:"Registro modificado"}); //devuelvo resultado query       
       (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    
    });
}


let deleteUser = (req,res)=>
{
    let id = {iduser: req.body.iduser};
    User.deleteOne(id, function(err)
    {
        res.status(200).send({estado:"Registro eliminado"}); //devuelvo resultado  
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }      
    });
           
   
}
module.exports={createUser,getUsers,deleteUser, getContactosByname,searchUserbyKey,updateUser,loginUser,registerUserWithSocialCredentials};
