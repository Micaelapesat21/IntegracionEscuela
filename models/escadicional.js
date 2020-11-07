
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdicionalSchema = new Schema({
    id: String,
    nombreAdicional: String,
    precioAdicional: Number
});


AdicionalSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
AdicionalSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});