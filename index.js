// Import express
let router = require('express').Router();
var express = require('express')
var app2 = express();
//Import Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
const AWS = require('aws-sdk');
const fs= require('fs');
const s3 = new AWS.S3({
    accessKeyId: "AKIAYYJPLQ2CRBWYJPGY",
    secretAccessKey: "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" 
});

//s3.listBuckets( {}, (err,data)=> {
//    if (err) throw err;
//    console.log(data);
//});

var parametros = {
    Bucket: 'regiapp-s3-data'
}
//s3.listObjectsV2( parametros, (err,data)=> {
//    if (err) throw err;
//   console.log(data);
//});


var parametrosGetObject = {
    Bucket: 'regiapp-s3-data',
    //Key: 'tarjeta arduino y lector rfid.JPG',
    Key: "Retiros/615dafb245a8aa00164a16f2_2021-10-23-1635174022773.jpg"
    //Etag: 'a3a61aba8edffee39079bf7d71581617'
}
s3.getObject(parametrosGetObject, (err,data)=> {
    if (err) throw err;
    console.log(data);
    //el data.Body es el que tiene el buffer
   // fs.writeFile("pruebaImagen.jpg", data.Body, 'binary', (err)=> {
     //   if (err) throw err;
      //  console.log("imagen grabada en disco");
   // });
});


/*
fs.readFile("image_de_s3.png", (err,data)=>{
        if (err) throw err;
        var parametrosPutObject = {
                Bucket: 'regiapp-s3-data',
                Key: 'Certificados/prueba-subida-imagen.jpg',
                Body: data
            }

        s3.putObject(parametrosPutObject, (err,data)=> {
            if (err) throw err;
            console.log(data);
 //           // devuelve esto que es como un id del archivo:
 //           //{ ETag: '"a3a61aba8edffee39079bf7d71581617"' } 
       })
})

*/
