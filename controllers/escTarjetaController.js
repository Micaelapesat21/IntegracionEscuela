var bodyParser = require('body-parser');
var Tarjeta = require('../models/esctarjeta');
var Usuario = require('../models/escusuarios');


let crearTarjeta = (req,res) =>
{
    console.log("crearTarjeta:" + JSON.stringify(req.body));

    console.log("tipoBody: " + tipoBody);

    Usuario.findOne({usuario: req.body.usuario}, function(err,result) { 
        console.log("Usuario: " + result._id);
            var nuevaTarjeta = new Tarjeta({
                description: req.body.description.description,
                tarjeta: 
                    {  statusTarj: { 
                                cvc: req.body.tarjeta.values.cvc,
                                expiry: req.body.tarjeta.status.expiry,
                                number: req.body.tarjeta.status.number
                            },
                        valuesTarj: {
                                cvc: req.body.tarjeta.values.cvc,
                                expiry: req.body.tarjeta.values.expiry,
                                number: req.body.tarjeta.values.number,
                                tipo: req.body.tarjeta.values.type,
                                },
                        validTarj: req.body.tarjeta.valid,
                    },
                tipoTarj: {
                    image: req.body.tipo.image,
                    titulo: req.body.tipo.title,
	                tipo:  req.body.tipo.type,
                },
                usuario: result._id
            });
            nuevaTarjeta.save().
            then
            (
                (nuevaTarjeta)=>
                {
                    res.status(200).send(nuevaTarjeta); 
                },
                (err)=>
                { 
                    res.status(500).send(err);
                    console.log(err);
                }
            )
}); 
}


let obtenerTarjetas = (req, res) =>
{      
    console.log("obtenerTarjetas");
    Tarjeta.find(function(err,listaTarjetas)
    {
        res.status(200).send(listaTarjetas);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });  

};

let obtenerTarjetaPorIdUsuario = (req, res) =>
{      
    //entrada el usuario
    console.log("obtenerTarjetaPorIdUsuario: " + req.params.id)

        Tarjeta.find({usuario:  req.params.id}, function(err,listaTarjetas)
        {
            res.status(200).send(listaTarjetas);
            (err)=>{
                res.status(500).send(err);
                console.log(err);
            }
        });  
};



module.exports = 
{
    crearTarjeta,
    obtenerTarjetas,
    obtenerTarjetaPorIdUsuario
};