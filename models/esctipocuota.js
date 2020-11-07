
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuotaSchema = new Schema({
    id: String,
    nombreTipoCuota: String,
    precioTipoCuota: Number
});


TipoCuotaSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
TipoCuotaSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});