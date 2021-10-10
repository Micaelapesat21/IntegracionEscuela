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



    Asistencia.find({alumno_id: req.body.alumnoId}, function(err, alumno) 
    { 
       // console.log("Alumno: " + alumno);
       // var fecha = Date.parse(alumno.fecha);
       // console.log("Fecha collection: " + fecha);
      //  if (fecha > tsI &&  fecha < tsF){
                res.status(200).send(alumno);
            //agregar array 
                (err)=>{

                    res.status(500).send(err)
                }
       // }

    });
};


let obtenerAsistencias = (req, res) =>
{      

    console.log("obtenerAsistencias");
    Asistencia.find( function(err, alumno) 
    { 

        console.log("estoy dentro de la colección: ");
        res.status(200).send(alumno);
          (err)=>{
                res.status(500).send(err)
            }
    });
};


module.exports = 
{
    obtenerAlumnoPorCursoA,
    obtenerAlumnoPorFecha,
    obtenerAlumnoPorEstado,
    obtenerAsistenciasPorAlumnoYFecha,
    obtenerAsistencias  
};