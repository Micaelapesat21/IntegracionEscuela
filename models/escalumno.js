
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoSchema = new Schema({
    id: String,
    nombre: String,
    apellido: String,
    dni: String,
    cuota:
    [
       { 
           type: Schema.ObjectId,
           ref: "esCcuota"
       }
    ]
});


AlumnoSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
AlumnoSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Escalumno = mongoose.model('escAlumno', AlumnoSchema);
console.log("se creo modelo");
module.exports = Escalumno;