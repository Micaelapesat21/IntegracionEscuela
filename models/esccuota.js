
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuotaSchema = new Schema({
    id: String,
    fechaDesde: Date,
    fechaHasta: Date,
    dni: String,
    facturada: Boolean,
    pagada: Boolean,
    tipoCuota:
    [
       { 
           type: Schema.ObjectId,
           ref: "esctipocuota"
       }
    ],
    comedor:
    [
       { 
           type: Schema.ObjectId,
           ref: "esccomedor"
       }
    ],
    adicional:
    [
       { 
           type: Schema.ObjectId,
           ref: "escadicional"
       }
    ],
    factura:
    [
       { 
           type: Schema.ObjectId,
           ref: "escfactura"
       }
    ]
});


CuotaSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
CuotaSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Esccuota = mongoose.model('esccuota', CuotaSchema);
console.log("se creo modelo");
module.exports = Esccuota;