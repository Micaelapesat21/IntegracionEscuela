var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoRetirosSchema = new Schema({
    fecha: String,
    alumno_id: String,
    imagenSource: String,
    nombreImagen: String
});


AlumnoRetirosSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
});
  
AlumnoRetirosSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var collectionName = 'escalumnoretiros'
var Escalumnoretiros = mongoose.model('escalumnoretiros ', AlumnoRetirosSchema, collectionName);
console.log("se creo modelo alumnoRetiros");
module.exports = Escalumnoretiros;

