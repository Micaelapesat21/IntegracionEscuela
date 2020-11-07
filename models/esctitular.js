
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = new Schema({
    id:String,
    nombre:String,
    apellido:String,
    dni:String,
    imagenPerfil: String,
    pais: String,
    provincia: String,
    ciudad: String,
    codigoPostal: String,
    direccion: String,
    password: String,
});

contactSchema.set('toObject', {
  transform: function (doc, ret) {
    ret._id = ret.id

    delete ret._id
    delete ret.__v
    delete password
  }
})

contactSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

var Esctitular = mongoose.model('esctitular', contactSchema);
console.log("se creo modelo");
module.exports = Esctitular;

