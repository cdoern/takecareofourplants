const dht = require('pigpio-dht');
const dataPin = 5;
var sleep = require('system-sleep');
var five = require('johnny-five');
var temp;
var humid;
const dhtType = 11; //optional
const sensor = dht(dataPin,dhtType);
var list = []; var board = new five.Board();
var moment = require('moment');
board.on("ready", function() {

var pin = new five.Pin({
    pin: "A2",
  });
  var pin2 = new five.Pin({
    pin: "A0",
  });
pin.read(function(error, value) {
//console.log(value);
    soilm=(((value-540)/(260-540))*100);
   soilm=Math.round(soilm);
   fs.appendFile('soil1.txt','\n'+soilm, function (err) {
    if (err) throw err;
  });
  sleep(5000);
});
pin2.read(function(error, value) {
//console.log(value);
    soilm2=(((value-540)/(260-540))*100);
   soilm2=Math.round(soilm2);
   fs.appendFile('soil2.txt','\n'+soilm2, function (err) {
    if (err) throw err;
  });
  sleep(5000);
});

setInterval(() => { 
    sensor.read();
}, 2500); // the sensor can only be red every 2 seconds
 
sensor.on('result', data => {
    console.log(`temp: ${(data.temperature-2)*(9/5)+32}°F`); 
    console.log(`rhum: ${data.humidity}%`); 
    temp = `${data.temperature*(9/5)+32}°F`;
    humid = `${data.humidity}%`;
    temp2 = `${data.temperature*(9/5)+32}`;
    humid2 = `${data.humidity}`;
    fs.appendFile('humid.txt','\n'+humid, function (err) {
    if (err) throw err;
  });
fs.appendFile('temp.txt','\n'+temp, function (err) {
    if (err) throw err;
  });

});
sensor.on('badChecksum', () => {
    console.log('checksum failed');
});
});
