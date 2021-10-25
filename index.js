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

//var parametros = {
//    Bucket: 'regiapp-s3-data'
//}
//s3.listObjectsV2( parametros, (err,data)=> {
//    if (err) throw err;
//   console.log(data);
//});

/*
var parametrosGetObject = {
    Bucket: 'regiapp-s3-data',
    //Key: 'tarjeta arduino y lector rfid.JPG',
    Key: 'Certificados/prueba.jpg '
    //Etag: 'a3a61aba8edffee39079bf7d71581617'
}
s3.getObject(parametrosGetObject, (err,data)=> {
    if (err) throw err;
    console.log(data);
    fs.writeFile("pruebaImagen.jpg", data.Body, 'binary', (err)=> {
        if (err) throw err;
        console.log("imagen grabada en disco");
    });
});
*/
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
