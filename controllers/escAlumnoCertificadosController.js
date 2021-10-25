//var axios = require('axios');
var Certificado =  require('../models/escalumnocertificados');
var bodyParser = require('body-parser');

let obtenerCertificados = (req, res) =>
{      
    console.log("obtenerRetiros" );
    Certificado.find( function(err, result) {    
            res.status(200).send(result);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
    });

};

let obtenerCertificadosPorAlumno = (req, res) =>
{      

    console.log("oobtenerCertificadosPorAlumno " );
    console.log("Retiros por alumno: " + req.params);
    console.log("alumnoId:" + req.params.alumnoId);
        
    Certificado.find({alumno_id: req.params.alumnoId}, function(err, result) 
    {
             res.status(200).send(result);
            //agregar array 
                (err)=>{
                    res.status(500).send(err);
                }
    });
};


let crearCertificado = (req,res) =>
{
    console.log("crearCertificado " );
    console.log( "fecha: " + req.body.fecha);
    console.log( "alumno_id: " + req.body.alumnoId);
    console.log( "certificado: " + req.body.imgsource);
    console.log( "certificado: " + req.body.imageName);
    var nuevoCertificado = Certificado({
        fecha: req.body.fecha,
        alumno_id:req.body.alumnoId,
        certificado: req.body.imgsource,
        nombreImagen: req.body.imageName
    });
    nuevoCertificado.save().
    then
    (
        (nuevoCertificado)=>
        {
            res.status(200).send(nuevoCertificado); 
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
    crearCertificado,
    obtenerCertificados,
    obtenerCertificadosPorAlumno,
     
};