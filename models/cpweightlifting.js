var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CPWeightLiftingSchema = new Schema({
    idcpweightlifting:String,
    sets:Number,
    repetitions:Number,
    percentaje:Number,
    weight:Number
});

var CPWeight = mongoose.model('CPWeight',CPWeightLiftingSchema);
console.log("se creo modelo");
module.exports = CPWeight;