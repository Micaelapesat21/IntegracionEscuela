
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuotaSchema = new Schema({
    id: String,
    mes: String,
    anio: String,
    pagada: Boolean,
    facturada: Boolean,
    turno: String,
    valorTurno: Number,
    valorServicios: Number,
    numeroTransaccion: Number,
    titular: String,
    numeroFactura: String,
    fechaEmision: Date,
    fechaVencimiento: Date,
    totalCuota: Number,
    quienPaga: String,
    servicios:
    [
        {
            "nombreServicio" : String,
            "precioMensual" : Number
        }
    ],
    datosFacturacion: 
    { 
        type: Schema.ObjectId,
        ref: "esctitular"
    }
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