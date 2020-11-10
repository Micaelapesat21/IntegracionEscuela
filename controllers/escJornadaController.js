var jornada = require('../models/escjornada');
var bodyParser = require('body-parser');


let crearjornada = (req,res) =>
{
    console.log("Crear jornada");
    console.log(req.body);
    var nuevojornada = jornada({
        id: req.body.id,
        nombrejornada: req.body.nombrejornada,
        preciojornada:req.body.preciojornada
    });
    nuevojornada.save().
    then
    (
        (nuevojornada)=>
        {console.log(nuevojornada);
            res.status(200).send(nuevojornada); 
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}

let actualizarjornada = (req,res) => 
{
    let id = {idjornada: req.body.idjornada};

    console.log("update",id);

    let params = { 
        nombrejornada: req.body.nombrejornada,
        preciojornada: req.body.preciojornada, 
};

for(let prop in params) if(!params[prop]) delete params[prop];


    jornada.findOneAndUpdate(
            id,
            {$set : params},
            {new:true},function(err)
        {
        console.log("jornada modificado");
        (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }
        });

    res.status(200).send({estado:"Campos modificados"}); 
}

let eliminarjornada = (req,res)=>
{
    console.log(res.req.body.idjornada)
    if (res.req.body.idjornada != null) {
        let id = {_id: res.req.body.idjornada};

        jornada.deleteOne(id, function(err)
        {
            console.log(id);
            res.status(200).send({estado:"jornada eliminado"}); //devuelvo resultado  
            (err)=>
            { 
                res.status(500).send(err);
                console.log(err);
            }      
        });
    } else {
        console.log("Id en blanco");
        res.status(200).send({estado:"Id en blanco, por favor enviar un idjornada"});
    } 
}

let obtenerjornadas = (req, res) =>
{      
    console.log("llegue a leer");
    jornada.find(function(err,listajornadas)
    {
        res.status(200).send(listajornadas);
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });       
};



module.exports = 
{
    crearjornada,
    actualizarjornada,
    eliminarjornada,
    obtenerjornadas
};