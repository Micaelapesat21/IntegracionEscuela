var Alumno = require('../models/escalumno');
var Titular = require('../models/esctitular');
var bodyParser = require('body-parser');


let crearAlumno = (req,res) =>
{
    console.log("Crear alumno");
    console.log(req.body);
    var nuevoAlumno = Alumno({
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        imagenPerfil: req.body.imagenPerfil,
        cuota: req.body.cuota
    });

    console.log(nuevoAlumno);
    nuevoAlumno.save().
    then
    (
        (nuevoAlumno)=>
        {` `
            console.log("Nuevo alumno", nuevoAlumno);
            Titular.findOneAndUpdate({_id: req.body.idTitular },{$push:{alumno:nuevoAlumno._id}},{ new: true },function(err,results) {
                if(err){
                    console.log("Error al crear alumno en push Alumno a Titular");
                    res.status(500).send(err);
                    console.log(err);
                }
                else{
                    console.log("Alumno creado");
                    res.status(200).send(nuevoAlumno);
                    console.log("Alumno encontrado", results);    
                }
            });
        },
        (err)=>
        { 
            console.log("No pudo crear el grupo");  
            res.status(500).send(err);
            console.log(err);
        }
    )
}


let actualizarAlumno = (req,res) => 
{
    let id = {idAlumno: req.body.idAlumno};

    console.log("update",id);

    let params = { 
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        imagenPerfil: req.body.imagenPerfil,
        cuota: req.body.cuota
};

for(let prop in params) if(!params[prop]) delete params[prop];


    Alumno.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("Alumno modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}

let eliminarAlumno = (req,res)=>
{
    console.log(res.req.body.idAlumno)
    if (res.req.body.idAlumno != null) {
        let id = {_id: res.req.body.idAlumno};

        Alumno.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Alumno eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idAlumno"});
    } 
}

let obtenerAlumnos = (req, res) =>
{      
    console.log("llegue a leer");
    Comedor.find(function(err,listaAlumnos)
    {
        res.status(200).send(listaAlumnos);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};













let asignarAdicional = (req,res) =>
{
    console.log("Asignar adicional");
    console.log(req.body);
    var dni = req.body.idAdicional;


    Alumno.findOneAndUpdate({_id: req.body.idAlumno },{$push:{adicional:nuevoAdicional}},{ new: true },function(err,results) {
        if(err){
            console.log("Error al asignar adicional a alumno");
            res.status(500).send(err);
            console.log(err);
        }
        else{
            console.log("Adicional asignado");
            res.status(200).send(nuevoAlumno);
            console.log("Adicional encontrado", results);    
        }
    });
    (err)=>
    { 
        console.log("No pudo asignar el adicional");  
        res.status(500).send(err);
        console.log(err);
    }
}


module.exports = 
{
    crearAlumno,
    asignarAdicional,
    eliminarAlumno,
    actualizarAlumno,
    obtenerAlumnos
};