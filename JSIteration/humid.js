const dht = require('pigpio-dht');
var fs = require('fs');
var moment = require('moment');
const dataPin = 5;
var temp;
var humid;
var temp2;
var humid2;
const dhtType = 11; //optional
const sensor = dht(dataPin,dhtType);
setInterval(writeto, 300000);
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

function writeto(){
    var date = moment().format("YYYY-MM-DD HH:mm");
        fs.appendFile('humid2.txt',humid2+','+date+'\n', function (err) {
            if (err) throw err;
          });
  var date = moment().format("YYYY-MM-DD HH:mm");
        fs.appendFile('temp2.txt',temp2+','+date+'\n', function (err) {
            if (err) throw err;
          });
}
