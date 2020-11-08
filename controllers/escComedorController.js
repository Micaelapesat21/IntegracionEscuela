var Comedor = require('../models/escComedor');
var bodyParser = require('body-parser');


let crearComedor = (req,res) =>
{
    console.log("Crear comedor");
    console.log(req.body);
    var nuevoComedor = Comedor({
        id: req.body.id,
        nombreViandaMensual: req.body.nombreViandaMensual,
        cantidadViandaMensual:req.body.cantidadViandaMensual,
        precioUnitario: req.body.precioUnitario,
    });
    nuevoComedor.save().
    then
    (
        (nuevoComedor)=>
        {console.log(nuevoComedor);
            res.status(200).send(nuevoComedor); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarComedor = (req,res) => 
{
    let id = {idComedor: req.body.idComedor};

    console.log("update",id);

    let params = { 
        nombreViandaMensual: req.body.nombreViandaMensual,
        cantidadViandaMensual: req.body.cantidadViandaMensual, 
        precioUnitario: req.body.precioUnitario,
};

for(let prop in params) if(!params[prop]) delete params[prop];


    Comedor.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("Comedor modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}

let eliminarComedor = (req,res)=>
{
    console.log(res.req.body.idComedor)
    if (res.req.body.idComedor != null) {
        let id = {_id: res.req.body.idComedor};

        Comedor.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Comedor eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idComedor"});
    } 
}

let obtenerComedores = (req, res) =>
{      
    console.log("llegue a leer");
    Comedor.find(function(err,listaComedores)
    {
        res.status(200).send(listaComedores);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};



module.exports = 
{
    crearComedor,
    actualizarComedor,
    eliminarComedor,
    obtenerComedores
};