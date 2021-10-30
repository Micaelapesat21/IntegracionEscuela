
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TarjetaSchema = new Schema({
    description: String,
    usuario: 
    { 
        type: Schema.ObjectId,
        ref: "escusuarios"
    },
    tarjeta: 
    {  statusTarj: { 
                cvc: String,
                expiry: String,
                number: String
               },
		valuesTarj: {
				cvc: String,
				expiry: String,
				number: String,
				tipo: String,
                },
        validTarj: Boolean,
    },
    tipoTarj: 
    { 
        image: String,
	    titulo: String,
	    tipo: String,
    }
    });


TarjetaSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
TarjetaSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Esctarjeta = mongoose.model('esctarjeta', TarjetaSchema);
console.log("se creo modelo");
module.exports = Esctarjeta;

