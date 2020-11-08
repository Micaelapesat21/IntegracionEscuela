var TipoCuota = require('../models/esctipocuota');
var bodyParser = require('body-parser');


let crearTipoCuota = (req,res) =>
{
    console.log("Crear tipocuota");
    console.log(req.body);
    var nuevoTipoCuota = TipoCuota({
        id: req.body.id,
        nombreTipoCuota: req.body.nombreTipoCuota,
        precioTipoCuota:req.body.precioTipoCuota
    });
    nuevoTipoCuota.save().
    then
    (
        (nuevoTipoCuota)=>
        {console.log(nuevoTipoCuota);
            res.status(200).send(nuevoTipoCuota); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarTipoCuota = (req,res) => 
{
    let id = {idTipoCuota: req.body.idTipoCuota};

    console.log("update",id);

    let params = { 
        nombreTipoCuota: req.body.nombreTipoCuota,
        precioTipoCuota: req.body.precioTipoCuota, 
};

for(let prop in params) if(!params[prop]) delete params[prop];


    TipoCuota.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("TipoCuota modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}

let eliminarTipoCuota = (req,res)=>
{
    console.log(res.req.body.idTipoCuota)
    if (res.req.body.idTipoCuota != null) {
        let id = {_id: res.req.body.idTipoCuota};

        TipoCuota.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"TipoCuota eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idTipoCuota"});
    } 
}

let obtenerTipoCuotas = (req, res) =>
{      
    console.log("llegue a leer");
    TipoCuota.find(function(err,listaTipoCuotas)
    {
        res.status(200).send(listaTipoCuotas);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};



module.exports = 
{
    crearTipoCuota,
    actualizarTipoCuota,
    eliminarTipoCuota,
    obtenerTipoCuotas
};