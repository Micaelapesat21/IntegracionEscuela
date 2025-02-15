var Curso = require('../models/esccurso');
var Alumno = require('../models/escalumno');
var bodyParser = require('body-parser');

//deberiamos agregar aca un crear alumnorfid sin ninguna pulsera o ningun serial asi lo 
//podemos ver en la otra
let crearCurso = (req,res) =>
{
    var nuevoCurso = Curso({
        id: req.body.id,
        numero: req.body.numero,
        division:req.body.division,
        alumnos: []
    });
    nuevoCurso.save().
    then
    (
        (nuevoCurso)=>
        {
            res.status(200).send(nuevoCurso); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarCurso = (req,res) => 
{
    let id = {_id: res.req.body.idCurso};

    let params = { 
        numeroCurso: req.body.numeroCurso,
        divisionCurso: req.body.divisionCurso, 
    };

for(let prop in params) if(!params[prop]) delete params[prop];


    Curso.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {

        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send(id); 
}

let eliminarCurso = (req,res)=>
{
    console.log(res.req.body.idCurso)
    if (res.req.body.idCurso != null) {
        let id = {_id: res.req.body.idCurso};

        Turno.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Curso eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {

        res.status(200).send({estado:"Id en blanco, por favor enviar un idCurso"});
    } 
}
 

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

let obtenerAlumnosPorCurso = (req, res) =>
{      
    //Curso.findOne( { _id: "6106d999be08ac21d6013843" }, function(err, listalumnos)
    Curso.findById( req.params.curso, function(err, docs) { 
            var alumnoencontrado = docs.alumnos.filter((id) => id !== "");    
   
            Alumno.find( { _id: { $in:alumnoencontrado } }, function(err, alumno) {       
 //       res.status(200).send(listalumnos.alumnos);
                res.status(200).send(alumno);
                (err)=>{
                    res.status(500).send(err)
                }
            });
    });
};

let obtenerCursos = (req, res) =>
{      
   // var arregloCurso= new Array();

    Curso.find(function(err,listaCursos)
    {
       // arregloCurso.sort(function(a, b){return a.numero - b.numero});
        res.status(200).send(listaCursos);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    }).sort({numero: 1, division: 1});  

    //arregloCurso.sort(function(a, b){return a.numero - b.numero})
       
};

let obtenerCursosPorId = (req, res) =>
{      
   // var arregloCurso= new Array();

   Curso.findById( req.params.curso, function(err, docs) { 
        res.status(200).send(docs);
        (err)=>{
            res.status(500).send(err)
        }
    });
        
};


let asignarAlumnoCurso = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};
    let idcurso = {_id: res.req.body.idCurso};

    let params = { 
        alumnos: idcurso.alumnos.push(id)
    };

    Curso.findOneAndUpdate(
            id,
            {$push : params},
            {new:true},function(err, success)
        {
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Alumno agregado"}); 
}


module.exports = 
{
    crearCurso,
    actualizarCurso,
    eliminarCurso,
    obtenerAlumnos,
    obtenerAlumnosPorCurso,
    obtenerCursos,
    obtenerCursosPorId,
    asignarAlumnoCurso

};