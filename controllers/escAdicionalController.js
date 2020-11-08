var Adicional = require('../models/escadicional');
var bodyParser = require('body-parser');


let crearAdicional = (req,res) =>
{
    console.log("Crear adicional");
    console.log(req.body);
    var nuevoAdicional = Adicional({
        id: req.body.id,
        nombreAdicional: req.body.nombreAdicional,
        precioAdicional:req.body.precioAdicional
    });
    nuevoAdicional.save().
    then
    (
        (nuevoAdicional)=>
        {console.log(nuevoAdicional);
            res.status(200).send(nuevoAdicional); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarAdicional = (req,res) => 
{
    let id = {idAdicional: req.body.idAdicional};

    console.log("update",id);

    let params = { 
        nombreAdicional: req.body.nombreAdicional,
        precioAdicional: req.body.precioAdicional, 
};

for(let prop in params) if(!params[prop]) delete params[prop];


    Adicional.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("Adicional modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}

let eliminarAdicional = (req,res)=>
{
    console.log(res.req.body.idAdicional)
    if (res.req.body.idAdicional != null) {
        let id = {_id: res.req.body.idAdicional};

        Adicional.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Adicional eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idAdicional"});
    } 
}

let obtenerAdicionales = (req, res) =>
{      
    console.log("llegue a leer");
    Adicional.find(function(err,listaAdicionales)
    {
        res.status(200).send(listaAdicionales);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};



module.exports = 
{
    crearAdicional,
    actualizarAdicional,
    eliminarAdicional,
    obtenerAdicionales
};