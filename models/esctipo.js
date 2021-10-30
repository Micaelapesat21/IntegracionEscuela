
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoSchema = new Schema({
	image: String,
	title: String,
	type: String,
    });


    TipoSchema.set('toObject', {
    transform: function (doc, ret) {
        ret._id = ret.id
        delete ret._id
        delete ret.__v
        delete password
    }
})
  
TipoSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

var Esctipo = mongoose.model('esctipo', TipoSchema);
console.log("se creo modelo");
module.exports = Esctipo;

