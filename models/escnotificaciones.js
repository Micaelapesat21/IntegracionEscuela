
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificacionSchema = new Schema({
    usuario:
    { 
        type: Schema.ObjectId,
        ref: "escusuario"
    },
    leida: String,
    texto: String,
    alumno:
    { 
        type: Schema.ObjectId,
        ref: "escalumno"
    }
});

NotificacionSchema.set('toObject', {
  transform: function (doc, ret) {
    ret._id = ret.id
    delete ret._id
    delete ret.__v
    delete password
  }
})

NotificacionSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

var Escnotificacion = mongoose.model('escnotificaciones', NotificacionSchema);
console.log("se creo modelo Notificaciones");
module.exports = Escnotificacion;