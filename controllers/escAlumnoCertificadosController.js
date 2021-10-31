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
              
            }
    });

};

let obtenerCertificadosPorAlumno = (req, res) =>
{      

         
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
           
        }
    ) 
}

module.exports = 
{
    crearCertificado,
    obtenerCertificados,
    obtenerCertificadosPorAlumno,
     
};