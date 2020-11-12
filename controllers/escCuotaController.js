var Cuota = require('../models/esccuota');
var Alumno = require('../models/escalumno');
var Servicio = require('../models/escservicio');
var Turno = require('../models/escturno');
var Titular = require('../models/esctitular')
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
        let dAlumno = docs.nombre + " " + docs.apellido;
        let dDni = docs.dni;
        let idServicio = docs.servicios;
        let idTurno = docs.turno;
        let dServiciosAFacturar = [];
        let dTurnoAFacturar = {};
        let dTotalServicios = 0;
        let dServicios = [ {
            nombreServicio:String,
            precioMensual:Number
            }
        ]

        for(let i = 0; i < idServicio.length; i++) {
            Servicio.findOne( { _id: idServicio[i] }, function(err, docs) 
            {
                dServiciosAFacturar.push(docs);
                


                if(idServicio.length-1 === i) {
                    Turno.findOne( { _id: idTurno }, function(err, docs) {
                        dTurnoAFacturar = docs;
                        
                        console.log(dTurnoAFacturar.nombreTurno);
                        console.log(dServiciosAFacturar.length);

                        for (let i = 0; i < dServiciosAFacturar.length ; i++) {
                            dServicios.push(dServiciosAFacturar[i]);
                            dTotalServicios = dTotalServicios + dServiciosAFacturar[i].precioMensual;
                        }

                        console.log(dTotalServicios);
                        console.log(dServicios);


                        let date = new Date()

                        var today = new Date();
                        var dd = today.getDate();
                        
                        var mm = today.getMonth()+1; 
                        var yyyy = today.getFullYear();
                        if(dd<10) 
                        {
                            dd='0'+dd;
                        } 
                        
                        if(mm<10) 
                        {
                            mm='0'+mm;
                        } 

                        today = dd+'/'+mm+'/'+yyyy;

                        if (mm==12) {
                            venc = dd+'/'+ 1 +'/'+yyyy;
                        } else {
                            venc = dd+'/'+ mm+1 +'/'+yyyy;
                        }
                        
                        console.log(dTurnoAFacturar);
                        dTotalCuota = dTotalServicios + dTurnoAFacturar.precioTurno

                        var nuevaCuota = Cuota({
                            mes:req.body.mes,
                            anio: req.body.anio,
                            pagada: false,
                            alumno: dAlumno,
                            numeroFactura: (Math.random() * 100000000000000),
                            fechaEmision: today,
                            fechaVencimiento: today + 30,
                            turno: dTurnoAFacturar.nombreTurno,
                            valorTurno: dTurnoAFacturar.precioTurno,
                            valorServicios: dTotalServicios,
                            totalCuota: dTotalCuota,
                            //servicios: dServicios,
                        });
                        console.log(dTotalServicios);
                        console.log(dTurnoAFacturar.precioMensual);
                        console.log(dTotalCuota)
                        console.log(nuevaCuota);
                        nuevaCuota.save().
                        then
                        (
                            (nuevaCuota)=>
                            {` `
                                console.log("Nueva cuota", nuevaCuota);
                                Alumno.findOneAndUpdate({_id: req.body.idAlumno },{$push:{cuota:nuevaCuota._id}},{ new: true },function(err,results) {
                                    if(err){
                                        console.log("Error al crear alumno en push Cuota a Alumno");
                                        //res.status(500).send(err);
                                        console.log(err);
                                        return;
                                    }
                                    else{
                                        console.log("Cuota creada");
                                        //res.status(200).send(nuevaCuota);
                                        console.log("Cuota encontrada", results);
                                        return;
                                    }
                                });
                            },
                        )


                    });
                }
            });
        };      



        

        var nuevaCuota = Cuota({
            mes:req.body.mes,
            anio: req.body.anio,
            pagada: false,
            alumno: dAlumno,
            dni: dDni,


        });



    

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