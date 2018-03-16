// libraries to install: NOT ACTUAL NAMES FOR DOWNLOADING PLEASE LOOK THESE UP FIRST
// node js wifiscanner
// moment.js
// the link on the website informs you how to install dotenv, snoowrap and snoostorm
// johnny-five
// all node libraires can be installed by saying "npm install **library name**"

require('dotenv').config();
var five = require('johnny-five');
var sleep = require('system-sleep');
counter = 0;
var conlist ='';
var postlist = [];
var theid = '';
var scanner = wifiscanner();
var des = '';
var day = 'INITIAL DAY OF WEEK WHEN STARTING CODE';
var pastdesmessage = 'no week has passed yet!';
var deslist = [];
var timebegin= '';
var timeend = '';
var voterlist = ['cdoern01'];
var descount = 0;
var message = '';
var dailyvoterlist = [];
var wvar = 1;
counter2 = 0;
counter3 = 0;
var board = new five.Board();
var moment = require('moment');
board.on('ready' , function() {
  var led = new five.Led(13);
    setInterval(checktime, 1000);
    setInterval(checkWifi, 5000);

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
     r.getComment(comment.id).distinguish({status: true, sticky: true})
    console.log(theid);
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
            postlist.push(post.link_title);
            console.log(postlist);
});
    });
}
 if(comment.body === 'test'){
    comment.reply('working');
    }
if(checkforval(comment.body) == true && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0") {
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
      if(postlist.includes(post.link_title)){
          console.log(post.link_title);
          r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
          listcheck(comment.author.name);
          console.log(voterlist);
          if(listcheck2(comment.author.name) == true){
    console.log('yes vote');
    counter+=1;
    counter2+=1
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
else if(checkforval(comment.body) == false && comment.body != "Yes votes | No votes \n -----------|------------- \n 0|0"){ 
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
      if(postlist.includes(post.link_title)){
          console.log(post.link_title);
          r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
          listcheck(comment.author.name);
          if(listcheck2(comment.author.name) == true){
    console.log('no vote');
    counter-=1;
    counter3+=1;
    comment.reply('Thanks for your vote against watering the plant! votes = ' + counter);
    r.getComment(theid).edit("Yes votes | No votes \n -----------|------------- \n" + counter2 +"|"+counter3)
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
    else if(commentfin == 'no' || commentfin.includes(' no ') || commentfin.includes('no ') || commentfin.includes('nein') || commentfin.includes('not on your nelly')){
        return false;
        console.log(false);
    }
        
    }
});
    function checktime() {
        time = moment().format('LTS');
        console.log(time);
        if(moment().format('LTS') === '7:10:00 AM' && counter > 0){
            counter = 0;
            counter2 = 0;
            counter3 = 0;
            postlist = [];
            led.on();
            sleep(50000);
            led.off();
            dailyvoterlist = [];
            des = 'yes';
            editmessage(des);
            day = moment().format('dddd');
            r.getSubreddit('takecareofourplants')
            .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water PLANT NAME today?', text: 'Hello! Gordon **WAS** watered last cycle. please check the soil moisture on the website! http://cdoern.com/ you can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ' + '\n **last week\'s decisions**: ' +  pastdesmessage + '\n \n **This week\'s decisions so far**:' + message})
             .sticky()
             .reply('Yes votes | No votes \n -----------|------------- \n 0|0')
             sendreminders();
             sleep(5000);
    }
        else if(moment().format('LTS') === '7:10:00 AM' && counter <= 0){
            counter = 0;
            counter2 = 0;
            counter3 = 0;
           postlist = [];
           dailyvoterlist = [];
            des = 'no'
            editmessage(des);
            day = moment().format('dddd');
            console.log('message for no sent');
          r.getSubreddit('takecareofourplants')
       .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water PLANT NAME today?', text: 'Hello! Gordon was **NOT** watered last cycle. please check the soil moisture on the website! http://cdoern.com/ you can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!' + '\n ' + '\n **last week\'s decisions**: ' + pastdesmessage  + '\n \n **This week\'s decisions so far**:' + message})
       .sticky()
       .reply('Yes votes | No votes \n -----------|------------- \n 0|0')
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
function editmessage(des){
    if(descount == 8){
        pastdesmessage = message;
        message = ("\n \n" +"- " + "__"+day+"__" + ": " + des);
        descount = 1; 
        deslist = [];
    }
    else{
message = message + ("\n \n" + "- "  +"__"+day+"__" +": "+ des);
descount++;
deslist.push(des);
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
                if(networks[i].ssid === 'WIFINAMEHERE'){
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
      r.composeMessage({
          to: entry,
          subject: 'Don\'t forget to vote!',
          text: 'Hello! You are subscribed to r/takecareofourplants and have been a recently active voter! voting has restarted for the day, this is your daily reminder to vote!'
      })

  });
};
function wifidownpost(){
    r.getSubreddit('takecareofourplants')
    .submitSelfpost({title: 'Wifi Downage From '+ timebegin + ' to '+ timeend +'info about voting below', text: 'If you voted in between ' + timebegin + ' and '+timeend+' your vote might not have been counted due to wifi outage. Please check if the bot responsed to yiur voting message and if not, please vote again.'})
    .sticky({num: 2})
}

function listcheck(x){
    if(voterlist.includes(x)){
        console.log('already added');
    }
    else{
        voterlist.push(x);
        console.log(voterlist);
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

});
