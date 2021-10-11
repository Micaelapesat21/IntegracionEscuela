//var axios = require('axios');
var Asistencia = require('../models/escalumnoasistencia');
var Alumno =  require('../models/escalumno');
var bodyParser = require('body-parser');

//deberiamos agregar aca un crear alumnorfid sin ninguna pulsera o ningun serial asi lo 
//podemos ver en la otra
 

let obtenerAlumnoPorCursoA = (req, res) =>
{      
    curso.findOne( { curso: req.body.idcurso }, function(err, docs) {
        var cursobuscado = docs.alumno;
        Alumno.find( { _id: cursobuscado }, function(err, docs) 
        { 
            res.status(200).send(docs);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
        });
    });

};

/* Asistencia.find ( { _id: req.body.fecha }, function(err, listaasistencia)
var alumno = listaasistencia.alumno 
if(alumno.curso = rec.body.curso)
//agregarlo al areglo final, la lista asitencia, no la variable alumno*/ 

let obtenerAlumnoPorFecha = (req, res) =>
{      

    var listaalumnos= new Array();
    Asistencia.find ( { _id: req.body.fecha }, function(err, alumno) 
    { 

        listaalumnos.push(alumno);
         //agregar array de alumnos para que me devuelva todos los de esa fecha 
        res.status(200).send(listaalumnos);
        (err)=>{
            res.status(500).send(err)
        }

    });
};

let obtenerAlumnoPorEstado = (req, res) =>
{      
    Asistencia.find( { _id: req.body.estado }, function(err, listalumnos) 

    { 
        res.status(200).send(listalumnos.alumnos);
        //agregar array 
        (err)=>{

            res.status(500).send(err)

        }

    });
};

let obtenerAsistenciasPorAlumnoYFecha = (req, res) =>
{      

    console.log("Asistencias por alumno y fecha: " + req.body);
    /*
        userId: userId,
        alumnoId: alumno,
        fechaI: fechaInicio,
        fechaF: fechaFin
    */
        console.log("alumnoId:" + req.body.alumnoId);
        console.log("fechaI: " + req.body.fechaI);
        console.log("fechaF: " + req.body.fechaF);


        var tsI = Date.parse(req.body.fechaI);
        var tsF = Date.parse(req.body.fechaF);
        console.log("fechaI en fecha: " + tsI);
        console.log("fechaF en fecha: " + tsF);

    Asistencia.find({$and:[{alumno_id: req.body.alumnoId}, {fecha:{$gte:req.body.fechaI}}, {fecha:{$lte:req.body.fechaF}}]}, function(err, alumno) 
    {
             res.status(200).send(alumno);
            //agregar array 
                (err)=>{
                    res.status(500).send(err);
                }
    });
};


let obtenerAsistencias = (req, res) =>
{      

    console.log("obtenerAsistencias");
    Asistencia.find( function(err, result) 
    { 
        console.log("estoy dentro de la colección: ");
        console.log("resultado: " + result);
        
        res.status(200).send(result);
          (err)=>{
                res.status(500).send(err)
            }
    });
};

let crearAsistencia = (req,res) =>
{
    var nuevaAsistencia = Asistencia({
        fecha: req.body.fecha,
        estado: req.body.estado,
        alumno_id:req.body.alumno_id
    });
    nuevaAsistencia.save().
    then
    (
        (nuevaAsistencia)=>
        {
            res.status(200).send(nuevaAsistencia); 
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
    crearAsistencia,
    obtenerAlumnoPorCursoA,
    obtenerAlumnoPorFecha,
    obtenerAlumnoPorEstado,
    obtenerAsistenciasPorAlumnoYFecha,
    obtenerAsistencias  
};