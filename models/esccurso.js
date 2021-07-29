var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = new Schema({
    id: String,
    numero: String,
    division: String,
    alumnos:[
       { 
            type: Schema.ObjectId,
            ref: "escalumno"
        }   
    ]
});

CursoSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
CursoSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Esccurso = mongoose.model('esccurso', CursoSchema);
console.log("se creo modelo curso");
module.exports = Esccurso;

