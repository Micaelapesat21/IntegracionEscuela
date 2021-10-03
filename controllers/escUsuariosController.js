var Usuario = require('../models/escusuarios');
var bodyParser = require('body-parser');



let obtenerUsuarios = (req, res) =>
{      
    console.log("llegue a leer");
    Usuario.find(function(err,listaUsuarios)
    {
        res.status(200).send(listaUsuarios);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });  
};

let obtenerUsuario = (req, res) =>
{      
    console.log("llegue a leer");
    Usuario.findOne({ email: req.body.email }, function (err, usuario) { 
        res.status(200).send(usuario);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
};

let obtenerUsuario2 = (req, res) =>
{      
    console.log("llegue a leer");
    Usuario.findOne({ usuario: req.body.usuario, password:req.body.password }, function (err, resultado) { 
        res.status(200).send(resultado);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
};

let loginUsuarios = (req, res) =>
{   
    console.log("Login Usuarios: " + req.body.usuario + req.body.password);
    Usuario.findOne({usuario:req.body.usuario, password:req.body.password},function(err,results)
    {
        if(err){
            res.status(500).send(err);
            console.log(err);
        }
        else{
            res.status(200).send(results); 
            console.log("RES LOGIN: " + res); 
            console.log(results);    
        }
    });
    
}

/*

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
} */

let crearUsuarios = (req,res) =>
{
    console.log("Crear usuario");
    console.log(req.body);
    var newContact = Usuario({
        email: req.body.email,
        password:req.body.password, 
        nombre:req.body.nombre,
        documento:req.body.documento,
        contacto:req.body.contacto,
        usuario: req.body.usuario,
        pagoaldia:"t"
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

/*

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

*/

let actualizarUsuarios = (req,res) => 
{
    let email = {_email: res.req.body.emailUsuarios};

    console.log("update",email);

    let params = { 
        email: req.body.email,
        password:req.body.password,
        
};

for(let prop in params) if(!params[prop]) delete params[prop];


        Usuario.findOneAndUpdate(
            email,
            {$set : params},
            {new:true},function(err)
        {
        console.log("Nombre modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}



let eliminarUsuarios = (req,res)=>
{
    console.log(res.req.body.emailUsuarios)
    if (res.req.body.emailUsuarios != null) {
        let id = {_id: res.req.body.emailUsuarios};

        Usuario.deleteOne(email, function(err)
        {
            console.log(email);
            res.status(200).send({estado:"usuario eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("email en blanco");
        res.status(200).send({estado:"email en blanco, por favor enviar un email"});
    } 
}

module.exports = 
{
    crearUsuarios,
    eliminarUsuarios,
    actualizarUsuarios,
    obtenerUsuarios,
    obtenerUsuario,
    obtenerUsuario2,
    loginUsuarios
};