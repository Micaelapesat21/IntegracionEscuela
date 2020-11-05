
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = new Schema({
    id:String,
    name:String,
    lastname:String,
    mail: String,
    profileImageURL: String,
    password:String,
    groupsAsMember:[
      {
         type: Schema.ObjectId,
         ref: "bpgroup"
      }
    ],
    groupsAsAdmin:[
      {
         type: Schema.ObjectId,
         ref: "bpgroup"
      }
    ],
});

contactSchema.set('toObject', {
  transform: function (doc, ret) {
    ret._id = ret.id
    delete ret._id
    delete ret.__v
    delete password
  }
})

contactSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

var Bpuser = mongoose.model('bpuser', contactSchema);
console.log("se creo modelo");
module.exports = Bpuser;

