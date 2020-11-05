var mongoose = require('mongoose');
var  Schema = mongoose.Schema;
var SchemaWithDetails = mongoose.Schema;
var bpuser = mongoose.model('bpuser');
var BPGroupSchema = new Schema({
    id:String,
    name:String,
});

BPGroupSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

BPGroupSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}
});

var Bpgroup = mongoose.model('bpgroup',BPGroupSchema);
console.log("se creo modelo");
module.exports = Bpgroup;