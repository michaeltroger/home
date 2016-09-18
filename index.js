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
var fs = require('fs');
var express = require('express');
var schedule = require('node-schedule');
var mongoose = require('mongoose');

var db_url = require('./config/db_url');
var models = require('./config/models');
var Temperature = models.tempModel;
var Motion = models.motionModel;
var sensors = require('./config/sensors');

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect(db_url);
mongoose.connection.on('error', function (err) {
	console.log(err);
	mongoose.connect(db_url);
});

var timeLastMotion = new Date();

var getSensorData = function(sensorId, callback) {
	fs.readFile('/sys/bus/w1/devices/' + sensorId + '/w1_slave', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		var data = data.split('\n')[1].split(" ")[9];
		data = data.slice(2) / 1000;
		callback(data);
	});
};


var j = schedule.scheduleJob('*/30 * * * *', function(){
	getSensorData(sensors[0], function(response) {
		var sensor1Data = response;
		getSensorData(sensors[1], function(response) {
			var sensor2Data = response;                          
			var temperature = new Temperature({ sensor1: sensor1Data, sensor2: sensor2Data });
		          
			temperature.save(function (err) { 
				if(err) {
					return console.log(err);
				}  
			});  

		 }); // end getSensorData
	 }); // end getSensorData
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	Temperature.find({}).sort({time: -1}).limit(20).exec(function(err, docs) { 
        if(err) {
			 res.json({message: err}); 
		}
		var oldTemps = docs;
	
		getSensorData(sensors[0], function(response) {
			var sensor1Data = response;
			getSensorData(sensors[1], function(response) {
					var sensor2Data = response;
      	               
					res.render('index', {
						sensor_1: sensor1Data, 
						sensor_2: sensor2Data, 
						oldTemps: oldTemps, 
						lastMotion: timeLastMotion
					});
 
			}); // end getSensorData
		}); // end getSensorData
	}); // end temperature find

});

app.get('/motion', function(req, res){
    timeLastMotion = new Date();
	var motion = new Motion();

	motion.save(function (err) { 
		if(err) { 
			res.json({message: err }); 
		}
		res.json({message:'successfully saved in db'});
	});
});

app.listen(3000);