Create a file:

config/db_url with the following content (fill out your connection details:
```
var monodbUrl = 'mongodb://<user>:<password>@<server>:<port>/<database>';
module.exports = monodbUrl;
```

config/sensors.js enter here your temperature sensor ids