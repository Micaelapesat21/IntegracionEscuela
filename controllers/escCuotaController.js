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

let crearCuota = (req, res) =>
{
    console.log("Crear cuota");
    let id = {_id: res.req.body.idTitular};

    let dMes = req.body.mes;
    let dAnio = req.body.anio;
    numeroFactura = Math.random()*10000000000;




    Titular.findOne( id, function(err, docs){})
    .populate({
        path: 'alumno',
        model: 'escalumno',
        populate: [{
            path: 'turno',
            model: 'escturno'           
        },
        { 
            path: 'servicios',
            model: "escservicio"
        }
        ]
    })
    .exec(function(err, resultado) {

        let precioServicios = 0;
        let precioServiciosCuota = 0;
        let precioServiciosTotal = 0;
        let precioTurnoTotal = 0;
        let detalleCuotas = [ ];
        let detalleServicios = [];
        

        
        for(let i = 0; i < resultado.alumno.length; i++) {

            precioTurnoTotal = precioTurnoTotal + resultado.alumno[i].turno.precioTurno;
            
            

            precioServicios = 0;
            if ( typeof JSON.stringify(resultado.alumno[i].servicios) !== 'undefined' ) {

                precioServiciosCuota = 0;
                for(let j = 0; j < resultado.alumno[i].servicios.length; j++) {
                    precioServicios = resultado.alumno[i].servicios[j].precioMensual;
                    precioServiciosTotal = precioServiciosTotal + precioServicios;
                    precioServiciosCuota = precioServiciosCuota + precioServicios;
                    detalleServicios = [];
                    var detalleServicio = 
                    {
                        nombreServicio:  resultado.alumno[i].servicios[j].nombreServicio,
                        precioMensual:  resultado.alumno[i].servicios[j].precioMensual
                    }
                    detalleServicios.push(detalleServicio);
                }
            }
            

            var detalleCuota = {
                nombreAlumno: resultado.alumno[i].nombre + " " + resultado.alumno[i].apellido,
                turno: resultado.alumno[i].turno.nombreTurno,
                precioTurno: resultado.alumno[i].turno.precioTurno,
                servicios: detalleServicios,
                precioServicios: precioServiciosCuota
            }
            detalleCuotas.push(detalleCuota);

        }

        
        let precioFactura = precioTurnoTotal + precioServiciosTotal;
        console.log(precioFactura);
        var today = new Date();

        var nuevaCuota = Cuota({
            mes:req.body.mes,
            anio: req.body.anio,
            pagada: false,
            datosFacturacion: resultado,
            numeroFactura: numeroFactura,
            facturada: true,
            pagada: false,
            fechaEmision: today,
            fechaVencimiento: today + 30,
            valorServicios: precioServicios,
            totalCuota: precioFactura,
            quienPaga: "",
            numeroTransaccion: "",
            detalleCuota: detalleCuotas,
        });

        console.log(nuevaCuota);

        nuevaCuota
        .save().
            then
            (
                (nuevaCuota)=>
                {` `
                    console.log("Nueva cuota", nuevaCuota);
                    Titular.findOneAndUpdate({_id: req.body.idTitular },{$push:{cuota:nuevaCuota._id}},{ new: true },function(err,results) {
                        if(err){
                            console.log("Error al crear alumno en push Cuota a Alumno");
                            res.status(500).send(err);
                            console.log(err);
                            return;
                        }
                        else{
                            console.log("Cuota creada");
                            res.status(200).send(nuevaCuota);
                            console.log("Cuota encontrada", results);
                            return;
                        }
                    });
                },
            )


    });

}




let crearCuota1 = (req,res) =>
{
    console.log("Crear cuota");

    let id = {_id: res.req.body.idAlumno};

    let dMes = req.body.mes;
    let danio = req.body.anio;
    let numeroFactura = Math.random()*10000000000;

    Alumno.findOne( id, function(err, docs) 
    { 
        let dAlumno = docs.nombre + " " + docs.apellido;
        let dTitular = docs.nombreTitular;
        let dDni = docs.dni;
        let idServicio = docs.servicios;
        let idTurno = docs.turno;
        let dServiciosAFacturar = [];
        let dTurnoAFacturar = {};
        let dTotalServicios = 0;
        let dServicios = [ ];

        console.log(dAlumno);


        if (idServicio > 0) {
            console.log("TRUEEEEEE")
            for(let i = 0; i < idServicio.length; i++) {
                Servicio.findOne( { _id: idServicio[i] }, function(err, docs) 
                {
                    dServiciosAFacturar.push(docs);


                    if(idServicio.length-1 === i) {
                        Turno.findOne( { _id: idTurno }, function(err, docs) {
                            dTurnoAFacturar = docs;
                            

                            for (let i = 0; i < dServiciosAFacturar.length ; i++) {
                                dServicios.push(dServiciosAFacturar[i]);
                                dTotalServicios = dTotalServicios + dServiciosAFacturar[i].precioMensual;
                            }
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
                                titular: dTitular,
                                numeroFactura: (Math.random() * 10000000000000000000),
                                facturada: true,
                                pagada: false,
                                fechaEmision: today,
                                fechaVencimiento: today + 30,
                                turno: dTurnoAFacturar.nombreTurno,
                                valorTurno: dTurnoAFacturar.precioTurno,
                                valorServicios: dTotalServicios,
                                totalCuota: dTotalCuota,
                                quienPaga: "",
                                numeroTransaccion: "",
                                servicios: dServicios,
                            });
        
            
                            nuevaCuota.save().
                            then
                            (
                                (nuevaCuota)=>
                                {` `
                                    console.log("Nueva cuota", nuevaCuota);
                                    Alumno.findOneAndUpdate({_id: req.body.idAlumno },{$push:{cuota:nuevaCuota._id}},{ new: true },function(err,results) {
                                        if(err){
                                            console.log("Error al crear alumno en push Cuota a Alumno");
                                            res.status(500).send(err);
                                            console.log(err);
                                            return;
                                        }
                                        else{
                                            console.log("Cuota creada");
                                            res.status(200).send(nuevaCuota);
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
        } else {

            

                    
                        Turno.findOne( { _id: idTurno }, function(err, docs) {
                            dTurnoAFacturar = docs;

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
                            dTotalCuota = dTurnoAFacturar.precioTurno

                            var nuevaCuota = Cuota({
                                mes:req.body.mes,
                                anio: req.body.anio,
                                pagada: false,
                                alumno: dAlumno,
                                titular: dTitular,
                                numeroFactura: (Math.random() * 10000000000000000),
                                facturada: true,
                                pagada: false,
                                fechaEmision: today,
                                fechaVencimiento: today + 30,
                                turno: dTurnoAFacturar.nombreTurno,
                                valorTurno: dTurnoAFacturar.precioTurno,
                                valorServicios: 0,
                                totalCuota: dTotalCuota,
                                quienPaga: "",
                                numeroTransaccion: "",
                            });
        
            
                            nuevaCuota.save().
                            then
                            (
                                (nuevaCuota)=>
                                {` `
                                    console.log("Nueva cuota", nuevaCuota);
                                    Alumno.findOneAndUpdate({_id: req.body.idAlumno },{$push:{cuota:nuevaCuota._id}},{ new: true },function(err,results) {
                                        if(err){
                                            console.log("Error al crear alumno en push Cuota a Alumno");
                                            res.status(500).send(err);
                                            console.log(err);
                                            return;
                                        }
                                        else{
                                            console.log("Cuota creada");
                                            res.status(200).send(nuevaCuota);
                                            console.log("Cuota encontrada", results);
                                            return;
                                        }
                                    });
                                },
                            )
    
                        });
                    

           

        }
    });
}



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