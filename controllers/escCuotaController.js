var Cuota = require('../models/esccuota');
var Alumno = require('../models/escalumno');
var Servicio = require('../models/escservicio');
var Turno = require('../models/escturno');
var bodyParser = require('body-parser');


/*

var nuevaCuota = Cuota({
            mes:req.body.mes,
            anio: req.body.anio,
            alumno: docs,
        });

*/

let crearCuota = (req,res) =>
{
    console.log("Crear cuota");
    console.log(res.req.body.idAlumno);

    let id = {_id: res.req.body.idAlumno};

    let dMes = req.body.mes;
    let danio = req.body.anio;
    let numeroFactura = Math.random()*10000000000;

    Alumno.findOne( id, function(err, docs) 
    { 
        console.log(docs);
        let alumno = docs.nombre + " " + docs.apellido;
        let dni = docs.dni;
        let idServicio = {_id: res.req.body.servicios};

        for(let i = 0; i < res.req.body.servicios.length; i++) {
            idServicio = {_id: res.req.body.servicios[i]};
            console.log(res.req.body.servicios[i]);
            Servicio.findOne( idServicio, function(err, docs) 
            {
                console.log(dni);
                console.log(docs)
                
            });       


        }

    

        res.status(200).send(docs);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });

}

/*
    var nuevaCuota = Cuota({
        mes:req.body.mes,
        anio: req.body.anio,
        facturada: false,
        pagada: false,
    });

    console.log(nuevaCuota);
    nuevaCuota.save().
    then
    (
        (nuevaCuota)=>
        {` `
            console.log("Nueva cuota", nuevaCuota);
            Cuota.findOneAndUpdate({_id: req.body.idAlumno },{$push:{cuota:nuevaCuota._id}},{ new: true },function(err,results) {
                if(err){
                    console.log("Error al crear cuota en push Cuota a Titular");
                    res.status(500).send(err);
                    console.log(err);
                }
                else{
                    console.log("Cuota creado");
                    res.status(200).send(nuevaCuota);
                    console.log("Cuota encontrado", results);    
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
*/


let actualizarCuota = (req,res) => 
{
    let id = {idCuota: req.body.idCuota};

    console.log("update",id);

    let params = { 
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        imagenPerfil: req.body.imagenPerfil,
        cuota: req.body.cuota
};

for(let prop in params) if(!params[prop]) delete params[prop];


    Cuota.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("Cuota modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}

let eliminarCuota = (req,res)=>
{
    console.log(res.req.body.idCuota)
    if (res.req.body.idCuota != null) {
        let id = {_id: res.req.body.idCuota};

        Cuota.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Cuota eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idCuota"});
    } 
}

let obtenerCuotas = (req, res) =>
{      
    console.log("llegue a leer");
    Cuota.find(function(err,listaCuotas)
    {
        res.status(200).send(listaCuotas);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};




module.exports = 
{
    crearCuota,
    eliminarCuota,
    actualizarCuota,
    obtenerCuotas
};