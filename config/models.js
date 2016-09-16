var mongoose = require('mongoose');


var tempSchema = new mongoose.Schema(
    {
        sensor1: Number,
        sensor2: Number,
        time : { type : Date, default: Date.now }
    }
);
var Temperature = mongoose.model('Temperature', tempSchema);


var motionSchema = new mongoose.Schema(
    {
        time : { type : Date, default: Date.now } 
    }
);
var Motion = mongoose.model('Motion', motionSchema);


var schemas = {
   tempModel: Temperature,
   motionModel: Motion
};

module.exports = schemas;