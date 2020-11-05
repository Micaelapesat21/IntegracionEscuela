var Group = require('../models/bpgroup');
var bpuser = require('../models/bpuser');
var bodyParser = require('body-parser');
const { isValidObjectId } = require('mongoose');

let createGroup = (req,res) =>
{
    console.log("create group");
    console.log("User admin", req.body.userID);
    console.log(req.body);
    var newGroup = Group({
        name:req.body.name,
    });

    console.log(newGroup);
    newGroup.save().
    then
    (
        (newGroup)=>
        {` `
            console.log("new group", newGroup);
            bpuser.findOneAndUpdate({_id: req.body.userID },{$push:{groupsAsAdmin:newGroup._id}},{ new: true },function(err,results) {
                if(err){
                    console.log("Create group error on push group to user");
                    res.status(500).send(err);
                    console.log(err);
                }
                else{
                    console.log("Create group Success");
                    res.status(200).send(newGroup);
                    console.log("bpuser found", results);    
                }
            });
        },
        (err)=>
        { 
            console.log("couldn't create group");  
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let deleteGroup = (req,res)=>
{
    let id = {idgroup: req.body.idgroup};
    Group.deleteOne(id, function(err)
    {
        res.status(200).send({estado:"Registro eliminado"});
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }      
    });
           
   
}

let renameGroup = (req,res) => 
{
    console.log("Update group")
    console.log("group id: " + req.body.groupID)
    console.log("New name: " + req.body.name)
   
    Group.findOneAndUpdate({ _id : req.body.groupID},{$set : {name: req.body.name}},{new:true},function(err)
    {
    console.log("Se actualizo el grupo correctamente");
       res.status(200).send({estado:"Se actualizo el grupo correctamente"}); 
       (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    
    });
}

//get groups for user type
let getUserGroups = (req, res) =>
{   
    console.log("query " + req.query);
    console.log("user id " + req.query.userID);
    console.log("Is Admin?: " + req.query.isAdmin);
    console.log("isProfileInfo:? " + req.query.isProfileInfo);

    var groupPath 

    if(req.query.isProfileInfo !== undefined && req.query.isProfileInfo.toLowerCase() === 'true') {
        groupPath = { path: 'groupsAsAdmin groupsAsMember'};
    } else if(req.query.isAdmin.toLowerCase() === 'false') {
        groupPath = { path: "groupsAsMember" };
    }else{
        groupPath = { path: "groupsAsAdmin" };
    }

    console.log("User type is", groupPath);
    
    bpuser.findOne({ _id : req.query.userID },'groupsAsAdmin groupsAsMember',function(err,userResult)
    {
        console.log("User description " + userResult);
        Group.populate(userResult, groupPath ,function(err, groups)
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
};


let getGroupsMembers = (req, res) =>
{   
    console.log("group id " + req.query.groupID);
    
    let findMembers = { $or: [{ groupsAsAdmin : req.query.groupID },{ groupsAsMember : req.query.groupID } ]};
    bpuser.find(findMembers,'name mail id',function(err,members)
    {
        console.log("Group members " + members);
        res.status(200).send(members);
    })
};

let searchNewMembersbyKey = (req, res) =>
{   
    console.log("searchNewMembersbyKey");    
    console.log("user key: " + req.query.key);    
    console.log("group id: " + req.query.groupID);    
    let name = {name: {'$regex' : '.*(?i)' + req.query.key + '.*'}};  
    let lastname = {lastname: {'$regex' : '.*(?i)' + req.query.key + '.*'}};
    bpuser.find({
        $and: [{ $or:[name,lastname]},
        {groupsAsMember : {$nin: [req.query.groupID]} }, 
        {groupsAsAdmin : {$nin: [req.query.groupID]} }
    ]
    },function(err,results)
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

let Addmembers = (req,res) => 
{
    console.log("new members group id: " + req.body.groupID)
    console.log("new members body: " + req.body.members)

    bpuser.updateMany({"_id" : {$in: req.body.members}  },{"$push": {"groupsAsMember": req.body.groupID} },{new: true, safe: true, upsert: true }).then((result) => {
        console.log("Members added successful")
        return res.status(201).json({
            status: "Success",
            message: "Resources Are Created Successfully",
            data: result
        });
    }).catch((error) => {
        console.log("Members counld not be added")
        console.log(error)
        return res.status(500).json({
            status: "Failed",
            message: "Database Error",
            data: error
        });
    });
}

let removeMember = (req,res) => 
{
    console.log("Remove Members service");
    console.log("memberID: ",req.userID);
    console.log("groupID: ",req.groupID);

    bpuser.findOneAndUpdate({"_id": req.body.userID },{"$pull": {"groupsAsMember": req.body.groupID} },{new: true, safe: true, upsert: true }).then((result) => {
        return res.status(202).json({
            status: "Success",
            message: "Resources Are Deleted Successfully",
            data: result
        });
    }).catch((error) => {
        return res.status(500).json({
            status: "Failed",
            message: "Database Error",
            data: error
        });
    });
}

let searchGroupbyKey = (req, res) =>
{   
    let name = {name: {'$regex' : '.*' + req.body.key + '.*'}};  
    Group.find(name,function(err,results)
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
module.exports={createGroup,deleteGroup,searchGroupbyKey,getGroupsMembers,Addmembers,removeMember,getUserGroups,searchNewMembersbyKey,renameGroup};