#Home surveillance with Node.js for Raspberry Pi

Necessary hardware:
- Raspberry Pi
- USB Webcam or Raspberry Camera configured with Motion (livestream has to be enabled)
- 2x DS18B20 temperature sensors

Install dependencies: `npm install`

Create a file for handling your MongoDB database configuration called
`config/db_url` with the following content (fill out your connection details):
```
var monodbUrl = 'mongodb://<user>:<password>@<server>:<port>/<database>';
module.exports = monodbUrl;
```

`config/sensors.js` enter here your temperature sensor ids

`views/index.ejs` set here the URL so that it points to your camera livestream by Motion 

Launch: `node index`
