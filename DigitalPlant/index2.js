const { createCanvas, loadImage } = require('canvas')
var fs = require('fs');

var growthrate = .5;

var height = 40;

var conditiondays = 0;

var currcondition = 0;

var weather = [];

var counter = 0;
var counter2 = 0;
var counter3 = 0;
var time = "";
var soilm = 0;

const canvas = createCanvas(400, 400)
const ctx = canvas.getContext('2d')

var weatheropts = ['Clear', 'Dry', 'Mild', 'Foggy', 'Cloudy', 'Drizzling', 'Raining', 'Pouring'];
var colors = ['#014708', '#015407', '#01661e', '#01661e', '#45512b', '#30381E'];
var conditions = ['Wet', 'Moist', 'Normal', 'Normal', 'Dry', 'Too Dry'];


var sleep = require('system-sleep');
var moment = require('moment');
files();
sleep(2000);
if(counter > 0){
var add = Math.ceil(Math.random() * 20);
console.log(add);
console.log(soilm);
soilm = parseInt(soilm) + add;
console.log(soilm);
fs.appendFile('/home/pi/takecareofourplants/soilm.txt', '\n'+soilm, function(err){
    if(err) throw err;
  });
ctx.font = '20px serif';
ctx.fillText('Herbert WAS watered last cycle', 30, 20);
counter = 0;
}

else if(counter <= 0){
var sub = Math.ceil(Math.random() * 7);
console.log(sub);
console.log(soilm);
soilm = parseInt(soilm) - sub;
console.log(soilm);
fs.appendFile('/home/pi/takecareofourplants/soilm.txt', '\n'+soilm, function(err){
    if(err) throw err;
  });
timetopost = true;
ctx.font = '20px serif';
ctx.fillText('Herbert WAS NOT watered last cycle', 10, 20);
counter = 0;
}
var daynum = 0;
var text = fs.readFileSync("/home/pi/takecareofourplants/daynum.txt").toString('utf-8');
var textByLine = text.split("\n")
textByLine.forEach(function(entry) {
        daynum = entry;
 });
daynum = parseInt(daynum)
sleep(2000);
for(var i = 0; i < weatheropts.length; i++){
  if(weatheropts[i] == weather[daynum - 1]){
      if(i > (weatheropts.length/2)){
          soilm = parseInt(soilm) + i;
          fs.appendFile('/home/pi/takecareofourplants/soilm.txt', '\n'+soilm, function(err){
              if(err) throw err;
          });
          ctx.font= '10px serif';
          ctx.fillText('added ' + i + ' percent to soil moisture due to weather', 90 , 390);
      }
      else if(i < 2){
          soilm = parseInt(soilm) - (i + 1)
          fs.appendFile('/home/pi/takecareofourplants/soilm.txt', '\n'+soilm, function(err){
              if(err) throw err;
          });
          ctx.font = '10px serif';
          ctx.fillText('subtracted ' + (i + 1) + ' percent from soil moisture due to weather', 90, 390);
      }
  }

}

if(conditions[Math.round((100/soilm) - 1)] == conditions[currentcondition] || (soilm < 16 && currentcondition == 5)){
    conditiondays++;
    fs.appendFile('/home/pi/takecareofourplants/conditiondays.txt', '\n'+conditiondays, function(err){
    if(err) throw err;
  });
    if(conditiondays > 15 && (currentcondition == 5 || currentcondition == 0)){
    console.log('dead..... please restart');
    
    }
}
else{
      if(soilm < 16){
        currentcondition = 5;
      }
      else{
        currentcondition = Math.round((100/soilm) - 1);
      }
    fs.appendFile('/home/pi/takecareofourplants/currentcondition.txt', '\n'+currentcondition, function(err){
    if(err) throw err;
  });
    conditiondays = 0;
    fs.appendFile('/home/pi/takecareofourplants/conditiondays.txt', '\n'+conditiondays, function(err){
    if(err) throw err;
  });
}

height = parseFloat(height) + .5;
fs.appendFile('/home/pi/takecareofourplants/height.txt', '\n'+height, function(err){
    if(err) throw err;
  });


counter = 0; 
counter2 = 0;
counter3 = 0;
fs.appendFile('/home/pi/takecareofourplants/count.txt', '\n'+counter, function(err){
    if(err) throw err;
  });
fs.appendFile('/home/pi/takecareofourplants/count2.txt', '\n'+counter2, function(err){
    if(err) throw err;
  });
fs.appendFile('/home/pi/takecareofourplants/count3.txt', '\n'+counter3, function(err){
    if(err) throw err;
  });

ctx.fillStyle = '#b66956';
ctx.fillRect(150, 220, 100, 100);
ctx.fillStyle = '#654321';
ctx.fillRect(195, 220 - height, 10, height);
ctx.fillStyle = '#fdfd96';
ctx.fillRect(280, 40, 110, 80);
ctx.fillStyle = '#000000';
ctx.font = '10px serif';
ctx.fillText('Notes from Herbert:', 281, 60)
ctx.fillText('Happy Fall!', 281, 80)

// NEW NEW NEW NEW 

ctx.fillStyle = '#000000';
ctx.font = '10px serif';
ctx.fillText('Weekly Weather Forecast', 1, 40)
ctx.font = '15px serif';
ctx.beginPath();   
ctx.moveTo(80, 50);
ctx.lineTo(80, 400)
ctx.stroke();
var counts = 0;
for(var i = 50; i <= 350; i+=50){
ctx.beginPath();
ctx.moveTo(0, i);
ctx.lineTo(80, i);
ctx.stroke();
ctx.font = '15px serif';
ctx.fillText(weather[counts], 5, i + 25);
if(counts == (daynum - 1)){
    ctx.fillText('<--', 90, i + 25)
}
counts++;
}
ctx.font = '15px serif';
ctx.fillText('Soil Moisture = ' + soilm + '%', 125, 350);
        

// NEW NEW NEW NEW


var curr = 0;

while(curr <= height){

if(curr >= 30 && curr <= height - 10){
ctx.fillStyle = colors[currentcondition];
ctx.beginPath();
ctx.ellipse(180, 220 - curr, 10, 20, 130, 0, Math.PI *2);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.ellipse(220, 220 - curr, 10, 20, -130, 0, Math.PI *2);
ctx.closePath();
ctx.fill();

ctx.fillStyle = '#EF6666';
    
ctx.beginPath();
ctx.arc(172, 217 - curr, 2, 0, 2 * Math.PI);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.arc(183, 222 - curr, 2, 0, 2 * Math.PI);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.arc(227, 223- curr, 2, 0, 2 * Math.PI);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.arc(217, 218- curr, 2, 0, 2 * Math.PI);
ctx.closePath();
ctx.fill();
}
curr+=30;
}

ctx.fillStyle = '#000000';
ctx.font = '10px serif';
ctx.fillText('Too Wet', 340, 140);
var my_gradient = ctx.createLinearGradient(350, 150, 375, 320);
my_gradient.addColorStop(0, '#014708');
my_gradient.addColorStop(0.2, '#015407');
my_gradient.addColorStop(0.4, '#01661e');
my_gradient.addColorStop(0.8, '#45512b');
my_gradient.addColorStop(1, '#30381e');
ctx.fillStyle = my_gradient;
ctx.fillRect(350, 150, 25, 170);

ctx.fillStyle = '#000000';
ctx.font = '10px serif';
ctx.fillText('Too Dry', 340, 340)
ctx.fillText('<--', 380, 150 + (170/(7.0 - currentcondition)));


ctx.globalCompositeOperation = 'destination-over'
ctx.fillStyle = '#7EC0EE';
ctx.fillRect(0, 0, 400, 400);

var buf = canvas.toBuffer();
fs.writeFileSync("/home/pi/takecareofourplants/plant.png", buf);
console.log('saved image');

sleep(6000);

function files(){

var text = fs.readFileSync("/home/pi/takecareofourplants/count.txt").toString('utf-8');
        var textByLine = text.split("\n")
        //console.log(textByLine);
        textByLine.forEach(function(entry) {
        counter = entry;
          });
          //console.log('done');

          dailyvoterlist=[];
          
var text = fs.readFileSync("/home/pi/takecareofourplants/soilm.txt").toString('utf-8');
            var textByLine = text.split("\n")
            //console.log(textByLine);
            textByLine.forEach(function(entry) {
            soilm = entry;
              });
              //console.log('done');

              
var text = fs.readFileSync("/home/pi/takecareofourplants/count2.txt").toString('utf-8');
                var textByLine = text.split("\n")
                //console.log(textByLine);
                textByLine.forEach(function(entry) {
                counter2 = entry;
                  });
                  //console.log('done');

var text = fs.readFileSync("/home/pi/takecareofourplants/count3.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  //console.log(textByLine);
                  textByLine.forEach(function(entry) {
                  counter3 = entry;
                    });
                    //console.log('done');


var text = fs.readFileSync("/home/pi/takecareofourplants/currentcondition.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            //console.log(textByLine);
                            textByLine.forEach(function(entry) {
                            currentcondition = entry;
                              });
                              //console.log('done');

var text = fs.readFileSync("/home/pi/takecareofourplants/conditiondays.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            //console.log(textByLine);
                            textByLine.forEach(function(entry) {
                            conditiondays = entry;
                              });
                              //console.log('done');

var text = fs.readFileSync("/home/pi/takecareofourplants/height.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            //console.log(textByLine);
                            textByLine.forEach(function(entry) {
                            height = entry;
                              });
                              //console.log('done')
                              weather = [];
var text = fs.readFileSync("/home/pi/takecareofourplants/weather.txt").toString('utf-8');
                              var textByLine = text.split("\n")
                              //console.log(textByLine);
                              textByLine.forEach(function(entry) {
                              weather.push(entry);
                                });
}
