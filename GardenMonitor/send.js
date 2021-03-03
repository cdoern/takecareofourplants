var fs = require('fs');
var list = [];
var sleep = require('system-sleep');
setInterval(pubnub, 10000);
function pubnub(){
    var input = "";
    var text = fs.readFileSync("list.txt").toString('utf-8');
    var textByLine = text.split("\n")
    textByLine.forEach(function(entry) {
        list = [];
     var textByLine2 = entry.split(" ")
    textByLine2.forEach(function(entry){
        list.push(entry);
         });
     
         var text = fs.readFileSync(list[0]+".txt").toString('utf-8');
         var textByLine = text.split("\n")
         textByLine.forEach(function(entry) {
             input = entry;
            });
            console.log(input);
            console.log(list[0]);  
            console.log(list[1]);
            console.log(list[2]);
         var pubnub = require('pubnub')({
            publish_key: list[2],
            subscribe_key: list[1],
            ssl: true
          });
          var channel = list[0];
          var str = list[0];
        var data = {
            'reading': input,
          };
          pubnub.publish({
            channel: channel,
            message: data,
          });
    sleep(2000);
        });
    }



       
