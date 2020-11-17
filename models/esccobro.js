
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CobroSchema = new Schema({
    id: String,
    nombreCobro: String,
    precioCobro: Number
});


CobroSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
CobroSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Esccobro = mongoose.model('esccobro', CobroSchema);
console.log("se creo modelo");
module.exports = Esccobro;