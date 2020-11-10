
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoSchema = new Schema({
    id: String,
    nombre: String,
    apellido: String,
    correo: String,
    pais: String,
    provincia: String,
    ciudad: String,
    codigoPostal: String,
    direccion: String,
    telefono: String,
    dni: String,
    tipoCuota:
    { 
        type: Schema.ObjectId,
        ref: "esctipocuota"
    }
    ,
    servicios:
    [
       { 
           type: Schema.ObjectId,
           ref: "escservicios"
       }
    ]
});


AlumnoSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
AlumnoSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Escalumno = mongoose.model('escalumno', AlumnoSchema);
console.log("se creo modelo");
module.exports = Escalumno;