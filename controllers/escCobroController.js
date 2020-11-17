var Cobro = require('../models/esccobro');
var bodyParser = require('body-parser');


let crearCobro = (req,res) =>
{
    console.log("Crear cobro");
    console.log(req.body);
    var nuevoCobro = Cobro({
        id: req.body.id,
        nombreCobro: req.body.nombreCobro,
        precioCobro:req.body.precioCobro
    });
    nuevoCobro.save().
    then
    (
        (nuevoCobro)=>
        {console.log(nuevoCobro);
            res.status(200).send(nuevoCobro); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarCobro = (req,res) => 
{
    let id = {_id: res.req.body.idCobro};

    console.log("update",id);

    let params = { 
        nombreCobro: req.body.nombreCobro,
        precioCobro: req.body.precioCobro, 
};

for(let prop in params) if(!params[prop]) delete params[prop];


    Cobro.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("cobro modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send(id); 
}

let eliminarCobro = (req,res)=>
{
    console.log(res.req.body.idcobro)
    if (res.req.body.idCobro != null) {
        let id = {_id: res.req.body.idCobro};

        Cobro.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"cobro eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idcobro"});
    } 
}

let obtenerCobros = (req, res) =>
{      
    console.log("llegue a leer");
    Cobro.find(function(err,listaCobros)
    {
        res.status(200).send(listaCobros);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};



module.exports = 
{
    crearCobro,
    actualizarCobro,
    crearCobro,
    obtenerCobros,
    eliminarCobro
};