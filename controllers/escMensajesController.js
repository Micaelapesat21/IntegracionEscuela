var Mensaje = require('../models/escmensaje');
var Curso = require('../models/esccurso');
var Alumno = require('../models/escalumno');
var Titular = require('../models/esctitular');
var Usuario = require('../models/escusuarios');
var bodyParser = require('body-parser');
const { QueryCursor } = require('mongoose');


let obtenerMensajes = (req, res) =>
{      
    console.log("obtenerMensajes");
    Mensaje.find({leida: "N"},function(err,mensajes){
        console.log("Mensajes del obtener : " + JSON.stringify(mensajes));
        res.status(200).send(mensajes);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
};

let obtenerMensajePorUsuario = (req, res) =>
{      
    console.log("llegue a leer los mensajes: " + req.params.usuario);
    //obtiene las notificaciones no leidas del usuario, ojo
    Mensaje.find({usuario:req.params.usuario, leida: "N"}, function (err, mensajes) { 
        res.status(200).send(mensajes);
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

let crearMensaje = (req,res) =>
{
    console.log("Crear Mensaje");
    console.log(req.body);

    Usuario.findById(req.body.usuario, function(err, result) {
        Titular.findOne({documento: result.documento}, function(err,result2) {
            console.log("encontre el titular: " + result2)
                    var newContact = Mensaje({
                        usuario: req.body.usuario,
                        leida: req.body.leida, 
                        texto: req.body.texto,
                        alumno: req.body.alumno,
                        fecha: req.body.fecha,
                        nombre: result2.nombre + " " + result2.apellido
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
        });

    });
     
}

function findUser(userId,res){
    
    return Alumno.findOne({_id: userId});
}

/*
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
*/
let actualizarMensaje = (req,res) => 
{
    //let id = {_id: res.req.body.idNotificacion};
    console.log("mensaje a marcar: " +  req.params.id)
    Mensaje.find({_id:req.params.id}, function (err, mensaje) { 

    //console.log("update",id);

    let params = { 
        usuario: mensaje.usuario,
        leida: "S", 
        texto: mensaje.texto,
        alumno: mensaje.alumno,
        fecha: mensaje.fecha
    };

for(let prop in params) if(!params[prop]) delete params[prop];

        Mensaje.findOneAndUpdate(
            {_id: req.params.id},
            {$set : params},
            //{new:true},
            function(err)
        {
        console.log(req.params.id);
        console.log(params);
        console.log("Mensaje modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

        res.status(200).send({estado:"Campos modificados"}); 

    });
}

let eliminarMensaje = (req,res)=>
{
    console.log(res.req.body.idMensaje)
    if (res.req.body.idMensaje != null) {
        let id = {_id: res.req.body.idMensaje};

        Mensaje.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Mensaje eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idMensaje"});
    } 
}

module.exports = 
{
    crearMensaje,
    eliminarMensaje,
    actualizarMensaje,
    obtenerMensajePorUsuario,
    obtenerMensajes
};