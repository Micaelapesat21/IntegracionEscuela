var axios = require('axios');
var Asistencia = require('../models/escalumnoasistencia');
var Alumno =  require('../models/escalumno');
var bodyParser = require('body-parser');

//deberiamos agregar aca un crear alumnorfid sin ninguna pulsera o ningun serial asi lo 
//podemos ver en la otra
 

let obtenerAlumnoPorCurso = (req, res) =>
{      
    Alumno.find ( { _id: req.body.curso }, function(err, listalumnos) 

    { 
        res.status(200).send(listalumnos.alumnos);
        //agregar Array

        (err)=>{

            res.status(500).send(err)

        }

    });

};

/* Asistencia.find ( { _id: req.body.fecha }, function(err, listaasistencia)
var alumno = listaasistencia.alumno 
if(alumno.curso = rec.body.curso)
//agregarlo al areglo final, la lista asitencia, no la variable alumno*/ 

let obtenerAlumnoPorFecha = (req, res) =>
{      
    Asistencia.find ( { _id: req.body.fecha }, function(err, listalumnos) 

    { 
        res.status(200).send(listalumnos.alumnos);
        //agregar array de alumnos para que me devuelva todos los de esa fecha 
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

module.exports = 
{
    obtenerAlumnoPorCurso,
    obtenerAlumnoPorFecha,
    obtenerAlumnoPorEstado
    
};