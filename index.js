clientid ="place bot client ID here";  
clientsec="Place bot client secret here"; 
user="username of bot account"    
pass="pass of bot account";  

require('dotenv').config();
var five = require('johnny-five');
var sleep = require('system-sleep');
counter = 0;
var fs = require('fs');
var daily = '';
var postmessage = '';
var parseInt = require('parse-int');
var soilm = 0;
var thetemp=0;
var messagesoil = '';
var count = 0;
var temp = 0;
var countstring ='';
var conlist ='';
var postlist = [''];
var theid = '';
var wifi = require('node-wifi');
var wifiscanner = require("wifiscanner");
var scanner = wifiscanner();
var des = '';
var day = '';
var pastdesmessage = '';
var deslist = [];
var timebegin= '';
var postdaily ='';
var weeklydes = [];
var timeend = '';
var voterlist = ['cdoern01'];
var descount = 1;
var counter5 = 0;
var message = '';
var dailyvoterlist = [];
var wvar = 1;
var nomessage = ['cdoern01'];
counter2 = 0;
counter4 =0;
counter3 = 0;
var getTheWeather = require("get-the-weather");
var ports = [
    { id: "A", port: "/dev/ttyACM0" },
    { id: "B", port: "/dev/ttyACM1" }
  ];
var moment = require('moment');
new five.Boards(ports).on("ready", function() {
var pin = new five.Pin({
    pin: "A2",
    board: this.byId("B")
  });
  var pin2 = new five.Pin({
    pin: "A0",
    board: this.byId("B")
  });
var led = new five.Led({
        pin: 13,
        board: this.byId("A")
      });
setInterval(checktime, 1000);
setInterval(checkWifi, 5000);
setInterval(soil, 1200000);
setInterval(pubnub, 3000);
setInterval(files, 1000);
pin.read(function(error, value) {
    soilm=(((value-540)/(240-540))*100);
   soilm=Math.round(soilm);
})
pin2.read(function(error, value) {
 temp = value;
})
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: clientid, 
    clientSecret: clientsec,
    username: user,
    password: pass
});

const client = new Snoostorm(r);

const streamOpts = {
    subreddit: 'takecareofourplants',
    results: 25
};

const comments = client.CommentStream(streamOpts);
comments.on('comment', (comment) => { 
if(comment.body == "Yes votes | No votes \n -----------|------------ \n 0|0"){
     theid = comment.id;
     fs.appendFile('comments.txt','\n'+theid, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
     r.getComment(comment.id).distinguish({status: true, sticky: true})
    console.log(theid);
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
            postlist.push(post.link_title);
            fs.appendFile('post.txt','\n'+post.link_title, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            var daily = post.link_id;
            daily = daily.substring(3);
            console.log(daily);
            console.log(postlist);
});
    });
}
if(comment.body == "remove from list"){
    r.getNewComments('takecareofourplants', {limit: 1}).then(function(posts){
        posts.forEach(function (post){
        if(post.link_title == "List removal request post"){
            nomessage.push(comment.author.name);
            fs.appendFile('nomessage.txt','\n'+(comment.author.name), function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            console.log(nomessage);
        }
    })
    })
}
 if(comment.body === 'test'){
    comment.reply('working');
    }
if(checkforval(comment.body) == true && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0") {
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
      if(postlist.includes(post.link_title) || postdaily == (post.link_title)){
          console.log(post.link_title);
          r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
          listcheck(comment.author.name);
          console.log(voterlist);
          if(listcheck2(comment.author.name) == true){
    console.log('yes vote');
    counter++;
    fs.appendFile('count.txt','\n'+counter, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    counter2++
    fs.appendFile('count2.txt','\n'+counter2, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    comment.reply('Thanks for your vote to water! votes = ' + counter);
    r.getComment(theid).edit("Yes votes | No votes \n -----------|------------ \n" + counter2 +"|"+counter3)
      }
     else if(listcheck2(comment.author.name) == false){
         console.log('repeat voter');
    }
}
      else{
          console.log('not right post');
      }
    });
}); 
}
else if(checkforval(comment.body) == false && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0"){ 
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
      if(postlist.includes(post.link_title) || postdaily == (post.link_title)){
          console.log(post.link_title);
          r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
          listcheck(comment.author.name);
          if(listcheck2(comment.author.name) == true){
    console.log('no vote');

    counter--;
    fs.appendFile('count.txt','\n'+counter, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    counter3++;
    fs.appendFile('count3.txt','\n'+counter3, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    comment.reply('Thanks for your vote against watering the plant! votes = ' + counter);
    r.getComment(theid).edit("Yes votes | No votes \n -----------|------------ \n" + counter2 +"|"+counter3)
          }
          else if(listcheck2(comment.author.name) == false){
              console.log("repeat voter");
          }
      }
      else{
          console.log('not right post');
      }
    });
});
}
function checkforval(x) {
    commentfin = x.toLowerCase();
    if(commentfin == 'yes' || commentfin.includes(' yes ') || commentfin.includes('yes ') ||commentfin.includes('prost') || commentfin.includes('aye') || commentfin.includes('sí')){
        return true;
        console.log('true');
    }
    else if(commentfin == 'no' || commentfin.includes(' no ') || commentfin.includes('no ') || commentfin.includes('nein') || commentfin.includes('not on your nelly') || commentfin.includes('nyet')){
        return false;
        console.log(false);
    }
        
    }
});
    function checktime() {
        console.log(day);
        time = moment().format('LTS');
        console.log(time);
        if(moment().format('LTS') === '12:00:00 AM'){
            console.log('message cleared');
            messagesoil ='';
            messagesoil = ("\n \n" + "- "  +"__"+time+"__" +": "+ soilm+"%") + messagesoil
            r.getSubmission('8csxtn').edit(messagesoil)
        }
        if(moment().format('LTS') === '10:35:00 AM' && counter > 0){
            counter = 0;
            fs.appendFile('count.txt','\n'+counter, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            counter2 = 0;
            fs.appendFile('count2.txt','\n'+counter2, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            counter3 = 0;
            fs.appendFile('count3.txt','\n'+counter3, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            postlist = [];
            led.on();
           sleep(25000);
           led.off();
            dailyvoterlist = [];
            des = 'yes';
            editmessage();
            day = moment().format('dddd');
            fs.appendFile('day.txt','\n'+day, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            r.getSubreddit('takecareofourplants')
            .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water Gordon today?', text: 'Hello! Gordon **WAS** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n The Soil Moisture is currently: ' + soilm + '% and it is ' + temp + ' degrees indoors \n ***** \n please check the soil moisture on the stickied post titled **Soil Moisture**: https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/. \n If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, **List removal request post** and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n' +  pastdesmessage + '\n \n **This week\'s decisions so far**:' + message})
            .sticky()
             .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
             sendreminders();
             sleep(5000);
    }
        else if(moment().format('LTS') === '10:35:00 AM' && counter <= 0){
            counter = 0;
            fs.appendFile('count.txt','\n'+counter, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            counter2 = 0;
            fs.appendFile('count2.txt','\n'+counter2, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            counter3 = 0;
            fs.appendFile('count3.txt','\n'+counter3, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
           postlist = [];
           dailyvoterlist = [];
            des = 'no'
            editmessage();
            day = moment().format('dddd');
            fs.appendFile('day.txt','\n'+day, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            console.log('message for no sent');
          r.getSubreddit('takecareofourplants')
          .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water Gordon today?', text: 'Hello! Gordon **WAS NOT** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n The Soil Moisture is currently: ' + soilm + '% and it is ' + temp + ' degrees indoors \n ***** \n please check the soil moisture on the stickied post titled **Soil Moisture**: https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/. \n If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, **List removal request post** and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n' +  pastdesmessage + '\n \n **This week\'s decisions so far**:' + message})
          .sticky()
       .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
       sendreminders();
       sleep(5000);
        }
        else {
            console.log('not time yet');
        }
    }

    function initialpost() {
    r.getHot('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
            postlist.push(post.title);
            console.log(postlist);
        });
    });
}
function editmessage(){
    if(descount == 8){
        pastdesmessage = message;
        fs.unlink('pasttrend.txt', function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
          fs.writeFile('pasttrend.txt','**Decisions for last week:**\n', function (err) {
              if (err) throw err;
              console.log('Updated!');
            });
          fs.appendFile('pasttrend.txt',pastdesmessage, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
        message = ("- " + "__"+day+"__" + ": " + des);
        descount = 1; 
        fs.writeFile('desc.txt','\n'+descount, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
        deslist = [];
        console.log(message);
        fs.unlink('trend.txt', function (err) {
          if (err) throw err;
          console.log('File deleted!');
        });
        fs.writeFile('trend.txt',' \n WEEKLY TREND! \n', function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
        fs.appendFile('trend.txt',message, function (err) {
          if (err) throw err;
          console.log('Updated!');
        });
        var text = fs.readFileSync("trend.txt").toString('utf-8');
        var textByLine = text.split("\n")
        console.log(textByLine);
        message= '';
        textByLine.forEach(function(entry) {
     message = message + '\n'+entry;
    
   
})
    }
    else{
var tempmess = ("\n" + "- "  +"__"+day+"__" +": "+ des);
fs.appendFile('trend.txt',tempmess, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
message = message + ("\n" + "- "  +"__"+day+"__" +": "+ des);
descount++;
fs.writeFile('desc.txt','\n'+descount, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
deslist.push(des);
console.log(message);
    }

}
function checkWifi(){
    var success = true;
    if (wvar == 1 && timebegin != ''){
        sleep(10000);
        timeend = moment().format('LTS');
        console.log('TIME BEGIN: '+timebegin+' TIME END: ' +timeend)
        sleep(2000);
        console.log('sending message');
        wifidownpost();
        timebegin = '';
        timeend = '';
    }
    else{
    scanner.scan(function(err, networks) {
        if (err) {
            console.log(err);
        }
        else{
            success = false;
            for(var i = 0; i < networks.length; i++){
                if(networks[i].ssid === 'SuperRouter'){
                  success = true;
                }
            }
            if(success == false){
                console.log('no wifi');
                wvar = 0;
                timebegin = moment().format('LTS');
            }
            else{
                console.log('wifi');
                wvar = 1;
            }

        }
    })
}
}
function sendreminders(){
  voterlist.forEach(function(entry) {
      if(nomessage.includes(entry)){
          console.log(entry+ ': no message');
      }
      else{
      r.composeMessage({
          to: entry,
          subject: 'Don\'t forget to vote!',
          text: 'Hello! You are subscribed to r/takecareofourplants and have been a recently active voter! voting has restarted for the day, this is your daily reminder to vote!'
      })
    }
  });
};
function wifidownpost(){
    r.getSubreddit('takecareofourplants')
    .submitSelfpost({title: 'Wifi Downage From '+ timebegin + ' to '+ timeend +' info about voting below', text: 'If you voted in between ' + timebegin + ' and '+timeend+' your vote might not have been counted due to wifi outage. Please check if the bot responsed to your voting message and if not, please vote again.'})
    .sticky({num: 2})
}

function listcheck(x){
    if(voterlist.includes(x)){
        console.log('already added');
    }
    else{
        voterlist.push(x);
        console.log(voterlist);
        fs.appendFile('people.txt','\n'+x, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
}
function listcheck2(x){
if(dailyvoterlist.includes(x)){
    console.log('already voted');
    console.log(dailyvoterlist);
    return(false);
}
else{
    console.log('not voted yet');
    dailyvoterlist.push(x);
    console.log(dailyvoterlist);
    return(true);
}

}

function soil(){
    var time = moment().format('lll');
    console.log(soilm);
     messagesoil = ("\n \n" + "- "  +"__"+time+"__" +": "+ soilm+"% -- "+temp+" degrees indoors") + messagesoil;
     r.getSubmission('8csxtn').edit(messagesoil)
    }
    function files(){
        var text = fs.readFileSync("count.txt").toString('utf-8');
        var textByLine = text.split("\n")
        console.log(textByLine);
        textByLine.forEach(function(entry) {
         counter = entry;
          });
          console.log(counter);
          voterlist=[];
          var text = fs.readFileSync("people.txt").toString('utf-8');
          var textByLine = text.split("\n")
          console.log(textByLine);
          textByLine.forEach(function(entry) {
          voterlist.push(entry);
            });
            console.log(voterlist);
            var text = fs.readFileSync("post.txt").toString('utf-8');
            var textByLine = text.split("\n")
            console.log(textByLine);
            textByLine.forEach(function(entry) {
             postdaily = entry;
              });
              console.log(postdaily);
              var text = fs.readFileSync("comments.txt").toString('utf-8');
              var textByLine = text.split("\n")
              console.log(textByLine);
              textByLine.forEach(function(entry) {
               theid = entry;
                });
                console.log(theid);
                var text = fs.readFileSync("count2.txt").toString('utf-8');
                var textByLine = text.split("\n")
                console.log(textByLine);
                textByLine.forEach(function(entry) {
                 counter2 = entry;
                  });
                  console.log(counter2);
                  var text = fs.readFileSync("count3.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  console.log(textByLine);
                  textByLine.forEach(function(entry) {
                   counter3 = entry;
                    });
                    console.log(counter3);
                    nomessage=[];
                    var text = fs.readFileSync("nomessage.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  console.log(textByLine);
                  textByLine.forEach(function(entry) {
                   nomessage.push(entry);
                    });
                    console.log(nomessage);
                  weeklydes = [];
                    var text = fs.readFileSync("trend.txt").toString('utf-8');
                    var textByLine = text.split("\n")
                    console.log(textByLine);
                    message = '';
                    textByLine.forEach(function(entry) {
                     message = message + '\n'+entry;
                      });
                      console.log(message);
                      var text = fs.readFileSync("pasttrend.txt").toString('utf-8');
                      var textByLine = text.split("\n")
                      console.log(textByLine);
                      pastdesmessage = '';
                      textByLine.forEach(function(entry) {
                       pastdesmessage = pastdesmessage + '\n'+entry;
                        });
                        console.log(pastdesmessage);
                        var text = fs.readFileSync("desc.txt").toString('utf-8');
                        var textByLine = text.split("\n")
                        console.log(textByLine);
                        textByLine.forEach(function(entry) {
                         descount = entry;
                          });
                          console.log(descount);
                          var text = fs.readFileSync("day.txt").toString('utf-8');
                          var textByLine = text.split("\n")
                          console.log(textByLine);
                          textByLine.forEach(function(entry) {
                           day = entry;
                            });
                            console.log(day);
          
        
    }
    function pubnub(){
        var pubnub = require('pubnub')({
            publish_key: 'PUBNUB publish ker here',
            subscribe_key: 'PUBNUB subscribe key here'
          });
          var channel = 'soil';
        var data = {
            'soil': soilm,
          };
          pubnub.publish({
            channel: channel,
            message: data,
          });
    }
   
});
