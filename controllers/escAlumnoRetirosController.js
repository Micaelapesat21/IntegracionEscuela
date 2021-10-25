//var axios = require('axios');
var Asistencia = require('../models/escalumnoasistencia');
var Alumno =  require('../models/escalumno');
var Retiro =  require('../models/escalumnoretiros');
var bodyParser = require('body-parser');

let obtenerRetiros = (req, res) =>
{      
    console.log("obtenerRetiros" );
    Retiro.find( function(err, result) {    
            res.status(200).send(result);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
    });

};

let obtenerRetirosPorAlumno = (req, res) =>
{      

    console.log("obtenerRetirosPorAlumno " );
    console.log("Retiros por alumno: " + req.params);
    console.log("alumnoId:" + req.params.alumnoId);
        
    Retiro.find({alumno_id: req.params.alumnoId}, function(err, result) 
    {
             res.status(200).send(result);
            //agregar array 
                (err)=>{
                    res.status(500).send(err);
                }
    });
};


let crearRetiro = (req,res) =>
{
    console.log("crearRetiro " );
    console.log( "fecha: " + req.body.fecha);
    console.log( "alumno_id: " + req.body.alumnoId);
    console.log( "imagenSource: " + req.body.imgsource);
    console.log( "certificado: " + req.body.imageName);

    var nuevoRetiro = Retiro({
        fecha: req.body.fecha,
        alumno_id:req.body.alumnoId,
        imagenSource: req.body.imgsource,
        nombreImagen: req.body.imageName
    });
    nuevoRetiro.save().
    then
    (
        (nuevoRetiro)=>
        {
            res.status(200).send(nuevoRetiro); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

module.exports = 
{
    crearRetiro,
    obtenerRetiros,
    obtenerRetirosPorAlumno,
     
};