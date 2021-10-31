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
              
            }
    });

};

let obtenerRetirosPorAlumno = (req, res) =>
{      

    console.log("obtenerRetirosPorAlumno " );
        
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
            
        }
    ) 
}

module.exports = 
{
    crearRetiro,
    obtenerRetiros,
    obtenerRetirosPorAlumno,
     
};