
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    email:String,
    password:String,
    nombre:String,
    documento:String,
    contacto:String,
    usuario: String,
    pagoaldia:String

});

UsuarioSchema.set('toObject', {
  transform: function (doc, ret) {
    ret._id = ret.id

    delete ret._id
    delete ret.__v
    delete password
  }
})

UsuarioSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

var escusuario = mongoose.model('escusuario', UsuarioSchema);
console.log("se creo modelo");
module.exports = escusuario;