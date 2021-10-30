var Notificacion = require('../models/escnotificaciones');
var Curso = require('../models/esccurso');
var Alumno = require('../models/escalumno');
var Titular = require('../models/esctitular');
var Usuario = require('../models/escusuarios');
var bodyParser = require('body-parser');
const { QueryCursor } = require('mongoose');


let obtenerNotificaciones = (req, res) =>
{      
    console.log("obtenerNotificaciones");
    Notificacion.find(function(err,listaNotificaciones)
    {
        console.log("collecion");
        res.status(200).send(listaNotificaciones);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });  
};

let obtenerNotificacionesPorUsuario = (req, res) =>
{      
    console.log("llegue a leer las notificaciones: " + req.params.usuario);
    //obtiene las notificaciones no leidas del usuario, ojo
    Notificacion.find({usuario:req.params.usuario, leida: "N"}, function (err, notificacion) { 
        console.log("encontre algo" + notificacion);
        res.status(200).send(notificacion);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
};


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

let crearNotificacion = (req,res) =>
{
    console.log("Crear Notificacion");
    console.log(req.body);
    var newContact = Notificacion({
        usuario: req.body.usuario,
        leida: req.body.leida, 
        texto: req.body.texto,
        alumno: req.body.alumno,
        fecha: req.body.fecha
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

function findUser(userId,res){
    
    return Alumno.findOne({_id: userId});
}

let crearNotificacionMasiva = async (req,res) =>
{
    console.log("Crear Notificacion Masiva");
    // recibo un id de curso y un texto para enviar
    // tengo que recorrer los alumnos del curso para agrrar de ahi 
    // los titulares y colocarlos como usuarios.  

    console.log(req.body);
    console.log("Curso id: " + req.body.curso);
 

    cursoSeleccionado = Curso.findOne({_id: req.body.curso}, function(err,result) {
            console.log("Encontro el curso:" + result);
            alumnosCurso = new Array();
            alumnosCurso = result.alumnos;

            console.log("Notificacion para los alumnos:" + alumnosCurso);
            console.log("Longitud del arreglo alumnos: " + alumnosCurso.length);

            for(i=0; i < alumnosCurso.length; i = i + 1){
                Alumno.findOne({_id: alumnosCurso[i]},function(err,result){
                 
                    Titular.findOne({_id: result.idTitular},function(err,result2){
                        
                        Usuario.findOne({usuario: result2.documento},function(err,result3){
                                    console.log("alumno:" + result._id);
                                    console.log("Titular:" + result2.documento);
                                    console.log("Usuario:" + result3._id);

                                var newContact = Notificacion({
                                    usuario: result3._id,
                                    leida: "N", 
                                    texto: req.body.texto,
                                    fecha: req.body.fecha,
                                    alumno: result.nombre + " " + result.apellido
                                });
                                newContact.save().then
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

                            });
                        });
                        });
            }
           
           
    });
    

    return true;

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
let actualizarNotificacion = (req,res) => 
{
    //let id = {_id: res.req.body.idNotificacion};
    console.log("notificacion a marcar: " +  req.params.id)
    Notificacion.find({_id:req.params.id}, function (err, notificacion) { 

    //console.log("update",id);

    let params = { 
        usuario: notificacion.usuario,
        leida: "S", 
        texto: notificacion.texto,
        alumno: notificacion.alumno,
        fecha: notificacion.fecha
    };

for(let prop in params) if(!params[prop]) delete params[prop];

    Notificacion.findOneAndUpdate(
            {_id: req.params.id},
            {$set : params},
            //{new:true},
            function(err)
        {
        console.log(req.params.id);
        console.log(params);
        console.log("Notificacion modificada");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

        res.status(200).send({estado:"Campos modificados"}); 

    });
}

let eliminarNotificacion = (req,res)=>
{
    console.log(res.req.body.idNotificacion)
    if (res.req.body.idNotificacion != null) {
        let id = {_id: res.req.body.idNotificacion};

        Notificacion.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Notificacion eliminada"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idNotificacion"});
    } 
}

module.exports = 
{
    crearNotificacion,
    eliminarNotificacion,
    actualizarNotificacion,
    obtenerNotificacionesPorUsuario,
    obtenerNotificaciones,
    crearNotificacionMasiva
};