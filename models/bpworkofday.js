var mongoose = require('mongoose');
var  Schema = mongoose.Schema;
var bpworkout = require('../models/bpworkout');
var BPGWorkOfDaySchema = new Schema({
    idworkofday:String,
    date:Date,
    workouts:
    [
       { 
           type: Schema.ObjectId,
           ref: "bpworkout"
       }
    ]
});

BPGWorkOfDaySchema.set('toObject', {
    transform: function (doc, ret) {
      ret._id = ret.id
      delete ret._id
      delete ret.__v
      delete password
    }
  })
  
  BPGWorkOfDaySchema.set('toJSON', {
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

var BpgWorkday = mongoose.model('BPGWorkOfDay',BPGWorkOfDaySchema);
console.log("se creo modelo");
module.exports = BpgWorkday;