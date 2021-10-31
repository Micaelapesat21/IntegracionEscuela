var axios = require('axios');
var Alumno = require('../models/escalumno');
var AlumnoRfid = require('../models/escalumnorfid');
var bodyParser = require('body-parser');

//listar todos los alumnos
let obtenerAlumnosRfid = (req, res) =>
{      
    console.log("llegue a leer");
    Alumno.find(function(err,listaAlumnos)
    {
        res.status(200).send(listaAlumnos);
        (err)=>{
            res.status(500).send(err);
            
        }
    });       
};


//asignarle la pulsera
let asignarAlumnoRfid = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};

 

    let params = { 
        rfidSerial: 'Asignado'
    };

    AlumnoRfid.findOneAndUpdate(
            id,
            {$push : params},
            {new:true},function(err, success)
        {
       
        console.log("Alumno asignado a un rfid");
        (err)=>
            { 
                res.status(500).send(err);
          
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}



//desasignar la pulsera
let desasignarAlumnoRfid = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};


    let params = { 
        servicios: 'No asignado'
};

    Alumno.findOneAndUpdate(
            id,
            {$pull : params},
            {new:true},function(err, success)
        {
       
        console.log("Alumno No asignado a un rfid");
        (err)=>
            { 
                res.status(500).send(err);
            
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}



module.exports = 
{
   // crearAlumnoRfid,
   // asignarAdicionalRfid,
   // eliminarAlumnoRfid,
   // actualizarAlumnoRfid,
    obtenerAlumnosRfid,
    //  obtenerAlumnoPorTitularRfid,
    asignarAlumnoRfid,
    desasignarAlumnoRfid
};