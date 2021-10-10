var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoAsistenaciaSchema = new Schema({
    fecha: String,
    estado: String,
    alumno_id:String
});


AlumnoAsistenaciaSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
});
  
AlumnoAsistenaciaSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var collectionName = 'escalumnoasistencia'
var Escalumnoasistenacia = mongoose.model('escalumnoasistencia ', AlumnoAsistenaciaSchema, collectionName);
console.log("se creo modelo alumnoAsistencia");
module.exports = Escalumnoasistenacia;

