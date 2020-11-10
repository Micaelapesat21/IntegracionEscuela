
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JornadaSchema = new Schema({
    id: String,
    nombreJornada: String,
    precioJornada: Number
});


JornadaSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
JornadaSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Escjornada = mongoose.model('escjornada', JornadaSchema);
console.log("se creo modelo");
module.exports = Escjornada;