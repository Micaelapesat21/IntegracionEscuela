
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComedorSchema = new Schema({
    id: String,
    nombreViandaMensual: String,
    cantidadViandaMensual: Number,
    precioUnitario: Number
});


ComedorSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
ComedorSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Esccomedor = mongoose.model('escComedor', ComedorSchema);
console.log("se creo modelo");
module.exports = Esccomedor;