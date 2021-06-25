
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuariosSchema = new Schema({
    email:String,
    password:String,
   
});

UsuariosSchema.set('toObject', {
  transform: function (doc, ret) {
    ret._id = ret.id

    delete ret._id
    delete ret.__v
    delete password
  }
})

UsuariosSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

var EscUsuarios = mongoose.model('escUsuarios', UsuariosSchema);
console.log("se creo modelo");
module.exports = EscUsuarios;