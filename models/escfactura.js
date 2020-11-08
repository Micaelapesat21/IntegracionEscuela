
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacturaSchema = new Schema({
    id: String,
    numeroFactura: String,
    fechaEmision: Date,
    fechaVencimiento: Date
});


FacturaSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
FacturaSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Escfactura = mongoose.model('escFactura', FacturaSchema);
console.log("se creo modelo");
module.exports = Escfactura;