
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = new Schema({
    usuario:
    { 
        type: Schema.ObjectId,
        ref: "escusuarios"
    },
    nombre: String,
    leida: String,
    texto: String,
    alumno: String,
    fecha: String,
    hora: String
});

MensajeSchema.set('toObject', {
  transform: function (doc, ret) {
    ret._id = ret.id
    delete ret._id
    delete ret.__v
    delete password
  }
})

MensajeSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

var Escmensaje = mongoose.model('escmensaje', MensajeSchema);
console.log("se creo modelo Mensaje");
module.exports = Escmensaje;