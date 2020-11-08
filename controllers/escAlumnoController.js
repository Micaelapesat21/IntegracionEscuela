var Alumno = require('../models/escAlumno');
var Titular = require('../models/escTitular');
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

module.exports = 
{
    crearAlumno
};