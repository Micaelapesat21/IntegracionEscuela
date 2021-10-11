var axios = require('axios');
var Alumno = require('../models/escalumno');
var Titular = require('../models/esctitular');
var Curso = require('../models/esccurso');
var Usuario = require('../models/escusuarios');
var bodyParser = require('body-parser');

//deberiamos agregar aca un crear alumnorfid sin ninguna pulsera o ningun serial asi lo 
//podemos ver en la otra
 
let crearAlumno = (req,res) =>
{
    
    Titular.findOne({_id: req.body.idTitular }, function(err, docs) {
        var titularBuscado = docs.alumno;
        var nombreTitular = docs.nombre + " " + docs.apellido;
        Alumno.find( { _id: titularBuscado }, function(err, docs) 
        { 

            console.log("Crear alumno");
            console.log(req.body);
            var nuevoAlumno = Alumno({
                nombre:req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
                pais: req.body.pais,
                provincia: req.body.provincia,
                ciudad: req.body.ciudad,
                codigoPostal: req.body.codigoPostal,
                direccion: req.body.direccion,
                telefono1: req.body.telefono1,
                telefono2: req.body.telefono2,
                dni: req.body.dni,
                turno: req.body.turno,
                curso: req.body.curso,
                idTitular: req.body.idTitular,
                servicios: req.body.servicios,
                nombreTitular: nombreTitular,
                gimnasio: req.body.gimnasio
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
                            console.log(req.body.idTitular);        
                            console.log("estoy puscheando el alumno al curso");
                            console.log(req.body.curso);
                            Curso.findOneAndUpdate({_id: req.body.curso},{$push:{alumnos:nuevoAlumno._id}},{ new: true },function(err,results) {
                                if(err){
                                    console.log("Error al crear alumno en push Alumno a curso");
                                    res.status(500).send(err);
                                    console.log(err);
                                }
                            });

                            if (nuevoAlumno.gimnasio === true) {
                            console.log("Me doy de alta");

                            var dataGimnasio = {
                                "usuario": "ESCB_" + req.body.dni,
                                "nombre": req.body.nombre,
                                "apellido": req.body.apellido,
                                "password": "123456",
                                "email": req.body.correo,
                                "dni": req.body.dni,
                                "fechaNacimiento": "01/01/2000",
                                "telefonoEmergencia": "1234" ,
                                "contactoEmergencia": "XXX"
                            };

                            console.log(dataGimnasio);

                            axios({
                                method: 'post',
                                url: 'https://peaceful-caverns-01556.herokuapp.com/api/alumnos/crear',
                                data: dataGimnasio
                              }).then((response) => {
                                console.log(response);
                                console.log("Alumno creado");
                                console.log("Titular encontrado", results); 
                                res.status(200).send(nuevoAlumno);
                              }, (error) => {
                                console.log(error);
                                console.log("No pudo crear el alumno");  
                                res.status(500).send(err);
                                console.log(err);
                              });
                            } else {
                                console.log("No me doy de alta");
                                res.status(200).send(nuevoAlumno);
                            }
                              
                        }
                    });

                    //aca deberiamos poner que tmb guarde el alumno en la tabla alumnosRfid 
                },
                (err)=>
                { 
                    console.log("No pudo crear el alumno");  
                    res.status(500).send(err);
                    console.log(err);
                }
            )
        });
    });
}



let actualizarAlumno = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};

    console.log("update",id);

    let params = { 
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        pais: req.body.pais,
        provincia: req.body.provincia,
        ciudad: req.body.ciudad,
        codigoPostal: req.body.codigoPostal,
        direccion: req.body.direccion,
        telefono1: req.body.telefono1,
        telefono2: req.body.telefono2,
        dni: req.body.dni,
        turno: req.body.turno,
        curso: req.body.curso,
        idTitular: req.body.idTitular,
        servicios: req.body.servicios
};

for(let prop in params) if(!params[prop]) delete params[prop];


    Alumno.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log(params);
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
    console.log(res.req.body.id)
    if (res.req.body.id != null) {
        let id = {_id: res.req.body.id};
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

        Curso.findOneAndUpdate({_id: res.req.body.curso},
            {$pull:{alumnos:res.req.body.id}},{ new: true },function(err,results) {

            if(err){
                console.log("Error al eliminar el curso");
                res.status(500).send(err);
                console.log(err);
            }
        });

        Titular.findOneAndUpdate({nombre: res.req.body.idTitular},
            {$pull:{alumno:res.req.body.id}},{ new: true },function(err,results) {

            if(err){
                console.log("Error al eliminar del titular");
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
    console.log("llegue a leer obtenerAlumnos");
    Alumno.find(function(err,listaAlumnos)
    {
        res.status(200).send(listaAlumnos);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};

let obtenerAlumnoPorTitular = (req, res) =>
{      
    console.log("llegue a leer obtenerAlumnoPorTitular");
    Titular.findOne( { _id: req.params.id }, function(err, docs) {
        var titularBuscado = docs.alumno;
        Alumno.find( { _id: titularBuscado }, function(err, docs) 
        { 
            res.status(200).send(docs);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
        });
    });
};

let obtenerAlumnoPorUsuario = (req, res) =>
{      
    console.log("llegue a leer obtenerAlumnoPorUsuario");
    Usuario.findOne( { _id: req.params.id }, function(err, docs) {
        var docUsuario = docs.documento

        Titular.findOne({documento: docUsuario}, function(err,docs1) {
        var titularBuscado = docs1.alumno;

            Alumno.find( { _id: titularBuscado }, function(err, docs3) { 
                res.status(200).send(docs3);
                (err)=>{
                    res.status(500).send(err);
                    console.log(err);
                }
            });
    });
});
};


let asignarServicioAlumno = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};

    console.log("update",id);

    let params = { 
        servicios: req.body.servicios
    };

    Alumno.findOneAndUpdate(
            id,
            {$push : params},
            {new:true},function(err, success)
        {
        console.log(err);
        console.log("Alumno modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}


let desasignarServicioAlumno = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};

    console.log("update",id);

    let params = { 
        servicios: req.body.servicios
};

    Alumno.findOneAndUpdate(
            id,
            {$pull : params},
            {new:true},function(err, success)
        {
        console.log(err);
        console.log("Alumno modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}


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

let asignarCursoAlumno = (req,res) => 
{
    let id = {_id: res.req.body.idAlumno};
    let params = { 
        curso: req.body.curso
    };

    Alumno.findOneAndUpdate(
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

    var nuevoAlumno = Alumno({
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        pais: req.body.pais,
        provincia: req.body.provincia,
        ciudad: req.body.ciudad,
        codigoPostal: req.body.codigoPostal,
        direccion: req.body.direccion,
        telefono1: req.body.telefono1,
        telefono2: req.body.telefono2,
        dni: req.body.dni,
        turno: req.body.turno,
        curso: req.body.curso,
        servicios: req.body.servicios,
        nombreTitular: nombreTitular,
        gimnasio: req.body.gimnasio
    });

    Curso.findOneAndUpdate({_id: req.body.idcurso },{$push:{alumnos:nuevoAlumno._id}},{ new: true },function(err,results) {
        (err)=>
            {
            res.status(500).send(err);
         
            };

        res.status(200).send({estado:"Alumno agregado al curso"}); 
        });
}

module.exports = 
{
    crearAlumno,
    asignarAdicional,
    eliminarAlumno,
    actualizarAlumno,
    obtenerAlumnos,
    obtenerAlumnoPorTitular,
    obtenerAlumnoPorUsuario,
    asignarServicioAlumno,
    desasignarServicioAlumno,
    asignarCursoAlumno
};