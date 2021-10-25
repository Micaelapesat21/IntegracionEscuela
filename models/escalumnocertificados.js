var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoCertificadosSchema = new Schema({
    fecha: String,
    alumno_id: String,
    certificado: String,
    nombreImagen: String
});


AlumnoCertificadosSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
});
  
AlumnoCertificadosSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var collectionName = 'escalumnocertificados'
var Escalumnocertificados = mongoose.model('escalumnocertificados', AlumnoCertificadosSchema, collectionName);
console.log("se creo modelo escalumno certificados");
module.exports = Escalumnocertificados;

