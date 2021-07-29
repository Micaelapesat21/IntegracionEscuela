var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoRfidSchema = new Schema({
    id: String,
    rfidSerial: String,
    alumno:
       { 
           type: Schema.ObjectId,
           ref: "escalumno"
       }
});


AlumnoRfidSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
AlumnoRfidSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Escalumnorfid = mongoose.model('escalumnorfid', AlumnoRfidSchema);
console.log("se creo modelo escalumnorfid");
module.exports = Escalumnorfid;

