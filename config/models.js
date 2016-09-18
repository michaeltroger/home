/**
Copyright 2016 Michael Troger <https://michaeltroger.com>
This file is part of Home Surveillance with Node.js.

Home Surveillance with Node.js is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Home Surveillance with Node.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Home Surveillance with Node.js.  If not, see <http://www.gnu.org/licenses/>.
*/
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