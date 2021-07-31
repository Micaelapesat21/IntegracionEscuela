var axios = require('axios');
var Curso = require('../models/esccurso');
var bodyParser = require('body-parser');

//deberiamos agregar aca un crear alumnorfid sin ninguna pulsera o ningun serial asi lo 
//podemos ver en la otra
 
let obtenerAlumnos = (req, res) =>
{         
    Alumno.find(function(err,listaAlumnos)
    {
        res.status(200).send(listaAlumnos);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};

let obtenerAlumnoPorCurso = (req, res) =>
{      
    Curso.findOne( { _id: req.body.curso }, function(err, listalumnos) 

    { 
        res.status(200).send(listalumnos.alumnos);

        (err)=>{

            res.status(500).send(err)

        }

    });
};

let obtenerCursos = (req, res) =>
{      

    Curso.find(function(err,listaCursos)
    {
        res.status(200).send(listaCursos);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });  
};


module.exports = 
{
    obtenerAlumnos,
    obtenerAlumnoPorCurso,
    obtenerCursos
      
};