
var bodyParser = require('body-parser');
var Tipo = require('../models/esctipo');

let crearTipo = (req,res) =>
{
    console.log("crearTipo");
    var nuevoTipo = Tipo({
        image: req.body.image,
        title: req.body.title,
        type: req.body.type
    });
    nuevoTipo.save().
    then
    (
        (nuevoTipo)=>
        {
            res.status(200).send(nuevoTipo); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarTipo = (req,res) => 
{
    console.log("actualizarTipo");
    let id = {_id: res.req.body.idTipo};

    console.log("update",id);

    let params = { 
        image: req.body.image,
        title: req.body.title,
        type: req.body.type
    }

for(let prop in params) if(!params[prop]) delete params[prop];


    Tipo.findOneAndUpdate(
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


let eliminarTipo = (req,res)=>
{
    console.log("eliminarTipo");
    console.log(res.req.body.idTipo)

    if (res.req.body.idCurso != null) {
        let id = {_id: res.req.body.idCurso};

        Tipo.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"Curso eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {

        res.status(200).send({estado:"Id en blanco, por favor enviar un idTipo"});
    } 
}


let obtenerTipos = (req, res) =>
{      
    console.log("obtenerTipos");
    Tipo.find(function(err,listaTipos)
    {
        res.status(200).send(listaTipos);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });  

};

let obtenerTipoPorId = (req, res) =>
{      
    console.log("obtenerTipoPorId");
   Tipo.findById( req.params.id, function(err, docs) { 
        res.status(200).send(docs);
        (err)=>{
            res.status(500).send(err)
        }
    });
        
};


module.exports = 
{
    crearTipo,
    actualizarTipo,
    eliminarTipo,
    obtenerTipos,
    obtenerTipoPorId
};