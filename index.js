//this is the exact code I use for my bot minus the credentials and the webvoting aspects. this requires you have a reddit bot and a pubnub account. pubnub function with key information can be found on line 771. PM u/cdoern01 on reddit or open a pull request here on github if you have questions.

clientid ="bot client id";  
clientsec="bot client sec";  
user="bot user name"    
pass="bot pass";  


require('dotenv').config(); //library used in conjunction with snoowrap
var five = require('johnny-five'); //how I connect to the arduinos through JS
var sleep = require('system-sleep'); //a sleep function used as a cooldown
counter = 0; //keeps tracks of the votes and is used to dtermine whether or not the plant is watered
var fortable = [];
var no = 0; //for webvoting purposes
var yes = 0; //for webvoting purposes
var mysql = require('mysql');

//next 6 lines are for web voting if you want to implement 
/*var con = mysql.createConnection({
  host: "db IP adress",
  user: "db user",
  password: "db user pass!",
  database: "db name"
}); */
var fs = require('fs'); // this is declaring the file system. This is used to keep variable values in text files so if the system crashes ( which it does as it gets more complicated) you can just pick up where you left off
var daily = ''; // this is the variable used to obtain the daily post ID
var yestotal = 0; // used for webvoting pm me if you want an explanation on anything web voting related
var tab = ''; //originally used for the table; it is now obsolete and never used, but could be implemented again
var nototal= 0; // again, webvoting, pm u/cdoern01 on reddit with questions
var postmessage = '';
var soilm = 0;
var alreadydone = 0;
var soilm2 = 0;
var thetemp=0;
var desbool = 'true';
var today ='';
var tempout = 0;
var dotheloop = true;
var messagesoil = '';
var count = 0;
var temp = 0;
var dailyp = '8rinyy';
var countstring ='';
var conlist ='';
var postlist = ['Voting down for tonight -- adding two things'];
var theid = '';
var wifi = require('node-wifi');
var wifiscanner = require("wifiscanner");
var scanner = wifiscanner();
var des = '';
var day = 'Tuesday';
var pastdesmessage = 'no data here yet';
var deslist = [];
var timebegin= '';
var tabone = '';
var tabtwo = '';
var tabthree = '';
var postdaily ='';
var weeklydes = [];
var timeend = '';
var voterlist = ['cdoern01'];
var descount = 1;
var counter5 =0;
var countwifi = 0;
var message = '';
var dailyvoterlist = [];
var wvar = 1;
var nomessage = ['cdoern01'];
counter2 = 0;
counter4 =0;
counter3 = 0;
var getTheWeather = require("get-the-weather");
var ports = [
{ id: "A", port: "/dev/ttyACM1" },
 { id: "B", port: "/dev/ttyACM0" }
  ];
var moment = require('moment');
new five.Boards(ports).on("ready", function() {
var pin = new five.Pin({
    pin: "A2",
    board: this.byId("B")
  });
  
var led = new five.Led({
        pin: 13,
        board: this.byId("A")
      });
      //again this is for connection to the Database for webvoting
    //  con.connect(function(err) {
    //    if (err) throw err;
    //    console.log("Connected!");
    //  });
     
setInterval(soil, 1200000);
setInterval(update, 300000);
setInterval(checktime, 1000);
// setInterval(checkWifi, 5000);
setInterval(pubnub, 3000);
//for web voting
//setInterval(updateyes, 60000);
setInterval(files, 1000);
//for web voting
//setInterval(checkweb, 1000);
pin.read(function(error, value) {
    soilm=(((value-540)/(260-540))*100);
   soilm=Math.round(soilm);
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
   dailyp = comment.link_id;
    console.log(dailyp);
    dailyp = dailyp.substring(3);
    fs.appendFile('dailypostid.txt','\n'+dailyp, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}

    if(comment.body == "post"){
        r.getNewComments('takecareofourplants', {limit: 1}).then(function(posts){
            posts.forEach(function (post){
            if(post.link_title == "test and manual post"){
            if(counter > 0){
                r.getSubreddit('takecareofourplants')
                .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water the Garden today?', text: 'Hello! the *Jeff Memorial Internet Garden* **WAS** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **GORDON** is currently: **' + soilm + '%** \n \n \n ***** \n please check the soil moisture for Gordon on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](https://cdoern.com/) If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/8764sg/list_removal_request_post/) and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree})          
                .sticky()
                 .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
                 sendreminders();
                 sleep(5000);
            }
            else if(counter <= 0){
                r.getSubreddit('takecareofourplants')
                .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water the Garden today?', text: 'Hello! the *Jeff Memorial Internet Garden* **WAS NOT** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **GORDON** is currently: **' + soilm + '%** \n \n \n ***** \n please check the soil moisture for Gordon on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](https://cdoern.com/) If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/8764sg/list_removal_request_post/) and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree})          
                .sticky()
                 .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
                 sendreminders();
                 sleep(5000);
            }
        
    }
})
        });
    }
    
//testing webvoting
// var sql = "INSERT INTO testtable (day, des) VALUES ?";
   // con.query(sql, [values], function (err, result) {
      //  if (err) throw err;
      //  console.log("Number of records inserted: " + result.affectedRows);
    //  });

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
     tabone = '';
     tabtwo = '';
     tabthree = '';
    var len = fortable.length;
    if(len > 7){
        len = 7;
    }
    var num = fortable.length;
    for(var i = len; i >= 1;i--){
       var lastday = moment().subtract(i, 'days').format('dddd');
       tabone = tabone + (lastday + '| ');
    }
    fs.writeFile('t1.txt',tabone,function(err){
        if (err) throw err;
        console.log('Updated!'); 
      });
 //   tab=tab+ '\n\n';
    tabtwo = tabtwo + '--';
    for(var j = 0; j <= len; j++){
       tabtwo = tabtwo + ('|--');
   }
   fs.writeFile('t2.txt',tabtwo,function(err){
    if (err) throw err;
    console.log('Updated!'); 
  });
 //  tab= tab +'\n\n';
   tabthree = tabthree + fortable[num-7];
    for(var i = (num-6); i <= num; i++){
        tabthree = tabthree + (' | ' + fortable[i]);
    } 
    fs.writeFile('t3.txt',tabthree,function(err){
        if (err) throw err;
        console.log('Updated!'); 
      });
    fs.writeFile('table.txt',tab,function(err){
        if (err) throw err;
        console.log('Updated!'); 
      });
  
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
        if(moment().format('LTS') === '7:00:00 AM' && counter > 0){

            //for webvoting
          //      var sql = "DELETE FROM yesvotes WHERE voting_message = 'another yes vote'";
           //     con.query(sql, function (err, result) {
           //       if (err) throw err;
           //       console.log("Number of records deleted: " + result.affectedRows);
          //      });
          //      var sql = "DELETE FROM novotes WHERE voting_message = 'another no vote'";
          //      con.query(sql, function (err, result) {
          //        if (err) throw err;
            //      console.log("Number of records deleted: " + result.affectedRows);
         //       });
         //     yestotal= 0;
          //    fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
      //          if (err) throw err;
       //         console.log('Updated!');
       //       });
         //     nototal = 0;
          //    fs.appendFile('nototal.txt','\n'+nototal, function (err) {
          //      if (err) throw err;
          //      console.log('Updated!');
          //    });
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
           sleep(16000);
           led.off();
            dailyvoterlist = [];
            des = 'yes';
            desbool = 'true';
            fs.appendFile('desbool.txt','\n'+desbool, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            editmessage();
            day = moment().format('dddd');
            fs.appendFile('day.txt','\n'+day, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            r.getSubreddit('takecareofourplants')
            .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water the Garden today?', text: 'Hello! the *Jeff Memorial Internet Garden* **WAS** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **GORDON** is currently: **' + soilm + '%** \n \n \n ***** \n please check the soil moisture for Gordon on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](https://cdoern.com/) If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree})          
            .sticky()
             .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
             sendreminders();
             sleep(5000);
    }
        else if(moment().format('LTS') === '7:00:00 AM' && counter <= 0){

            //for webvoting
             //   var sql = "DELETE FROM yesvotes WHERE voting_message = 'another yes vote'";
              //  con.query(sql, function (err, result) {
              //    if (err) throw err;
              //    console.log("Number of records deleted: " + result.affectedRows);
              //  });
            //     var sql = "DELETE FROM novotes WHERE voting_message = 'another no vote'";
             //   con.query(sql, function (err, result) {
            //      if (err) throw err;
            //      console.log("Number of records deleted: " + result.affectedRows);
           //     });
          //    yestotal= 0;
             // fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
             //   if (err) throw err;
             //   console.log('Updated!');
           //   });
          //    nototal = 0;
          //    fs.appendFile('nototal.txt','\n'+nototal, function (err) {
          //      if (err) throw err;
         //       console.log('Updated!');
        //      });
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
            desbool = 'false';
            fs.appendFile('desbool.txt','\n'+desbool, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            editmessage();
            day = moment().format('dddd');
            fs.appendFile('day.txt','\n'+day, function (err) {
                if (err) throw err;
                console.log('Updated!');
              });
            console.log('message for no sent');
          r.getSubreddit('takecareofourplants')
          .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water the Garden today?', text: 'Hello! the *Jeff Memorial Internet Garden* **WAS NOT** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **GORDON** is currently: **' + soilm + '%** \n \n \n ***** \n please check the soil moisture for Gordon on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](https://cdoern.com/) If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' + tabone + '\n' + tabtwo +'\n' +tabthree})          
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
    var tabone = '';
    var tabtwo = '';
    var tabthree = '';
    fs.unlinkSync('t1.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      fs.unlink('t2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      fs.unlinkSync('t3.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    if(descount>=7){
    fortable.shift();
    fortable.forEach(function(entry) {
        fs.appendFile('trend.txt','\n'+entry, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });  
    });
    }
    fortable.push(des);
    var temps = '-'+des;
     var len = fortable.length;
     if(len > 7){
        len = 7;
    }
    var num = fortable.length;
    for(var i = len; i >= 1;i--){
        var lastday = moment().subtract(i, 'days').format('dddd');
        tabone = tabone + (lastday + '| ');
     }
     fs.writeFile('t1.txt',tabone,function(err){
         if (err) throw err;
         console.log('Updated!'); 
       });
  //   tab=tab+ '\n\n';
     tabtwo = tabtwo + '--';
     for(var j = 0; j <= len; j++){
        tabtwo = tabtwo + ('|--');
    }
    fs.writeFile('t2.txt',tabtwo,function(err){
     if (err) throw err;
     console.log('Updated!'); 
   });
  //  tab= tab +'\n\n';
    tabthree = tabthree + fortable[num-7];
     for(var i = (num-6); i <= num; i++){
         tabthree = tabthree + (' | ' + fortable[i]);
     } 
     fs.writeFile('t3.txt',tabthree,function(err){
         if (err) throw err;
         console.log('Updated!'); 
       });
     fs.appendFile('trend.txt','\n'+temps, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
      fs.unlink('table.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      fs.writeFile('table.txt',tab,function(err){
        if (err) throw err;
        console.log('Opened!'); 
      });
      descount++;
      fs.writeFile('desc.txt','\n'+descount,function(err){
        if (err) throw err;
        console.log('Updated!'); 
      });
      
}

function checkWifi(){
    if (wvar == 1 && timebegin != '' && countwifi >= 24){
        sleep(10000);
        timeend = moment().format('LTS');
        console.log('TIME BEGIN: '+timebegin+' TIME END: ' +timeend)
        sleep(2000);
        console.log('sending message');
        wifidownpost();
        timebegin = '';
        timeend = '';
        countwifi = 0;
    }
    else{
    scanner.scan(function(err, networks) {
        if (err) {
            console.log(err);
        }
            success = false;
            for(var i = 0; i < networks.length; i++){
                if(networks[i].ssid === 'SuperRouter'){
                  success = true;
                }
            }
            if(success == false && alreadydone != 1){
                console.log('no wifi');
                wvar = 0;
                timebegin = moment().format('LTS');
                alreadydone = 1;
            }
            if(alreadydone == 1){
                    countwifi++;
            }
            else if(success == true){
                console.log('wifi');
                wvar = 1;
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
     messagesoil = ("\n \n" + "- "  +"__"+time+"__" +": "+ soilm+"%") + messagesoil;
     r.getSubmission('8csxtn').edit(messagesoil)
    }
    function files(){
        var text = fs.readFileSync("count.txt").toString('utf-8');
        var textByLine = text.split("\n")
        console.log(textByLine);
        textByLine.forEach(function(entry) {
         counter = entry;
          });
         
          voterlist=[];
          var text = fs.readFileSync("people.txt").toString('utf-8');
          var textByLine = text.split("\n")
          console.log(textByLine);
          textByLine.forEach(function(entry) {
          voterlist.push(entry);
            });
        
            var text = fs.readFileSync("post.txt").toString('utf-8');
            var textByLine = text.split("\n")
            console.log(textByLine);
            textByLine.forEach(function(entry) {
             postdaily = entry;
              });
             
              var text = fs.readFileSync("comments.txt").toString('utf-8');
              var textByLine = text.split("\n")
              console.log(textByLine);
              textByLine.forEach(function(entry) {
               theid = entry;
                });
               
                var text = fs.readFileSync("count2.txt").toString('utf-8');
                var textByLine = text.split("\n")
                console.log(textByLine);
                textByLine.forEach(function(entry) {
                 counter2 = entry;
                  });
                  
                  var text = fs.readFileSync("count3.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  console.log(textByLine);
                  textByLine.forEach(function(entry) {
                   counter3 = entry;
                    });
                   
                    nomessage=[];
                    var text = fs.readFileSync("nomessage.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  console.log(textByLine);
                  textByLine.forEach(function(entry) {
                   nomessage.push(entry);
                    });
                   
                  weeklydes = [];
                    var text = fs.readFileSync("trend.txt").toString('utf-8');
                    var textByLine = text.split("\n")
                    console.log(textByLine);
                    message = '';
                    fortable = [];
                    textByLine.forEach(function(entry) {
                    fortable.push(entry);
                     message = message + '\n'+entry;
                      });
                      
                      var text = fs.readFileSync("pasttrend.txt").toString('utf-8');
                      var textByLine = text.split("\n")
                      console.log(textByLine);
                      pastdesmessage = '';
                      textByLine.forEach(function(entry) {
                       pastdesmessage = pastdesmessage + '\n'+entry;
                        });
                       
                        var text = fs.readFileSync("desc.txt").toString('utf-8');
                        var textByLine = text.split("\n")
                        console.log(textByLine);
                        textByLine.forEach(function(entry) {
                         descount = entry;
                          });
                        
                          var text = fs.readFileSync("day.txt").toString('utf-8');
                          var textByLine = text.split("\n")
                          console.log(textByLine);
                          textByLine.forEach(function(entry) {
                           day = entry;
                            });
                          
                            var text = fs.readFileSync("dailypostid.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            console.log(textByLine);
                            textByLine.forEach(function(entry) {
                             dailyp = entry;
                              });
                              var text = fs.readFileSync("t1.txt").toString('utf-8');
                              tabone = text;
                              console.log(tabone);
                              var text = fs.readFileSync("t2.txt").toString('utf-8');
                              tabtwo = text;
                              console.log(tabtwo);
                              var text = fs.readFileSync("t3.txt").toString('utf-8');
                              tabthree = text;
                              console.log(tabthree);
                             
                              var text = fs.readFileSync("desbool.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            console.log(textByLine);
                            textByLine.forEach(function(entry) {
                             desbool = entry;
                              });
                             
                              var text = fs.readFileSync("yestotal.txt").toString('utf-8');
                              var textByLine = text.split("\n")
                              console.log(textByLine);
                              textByLine.forEach(function(entry) {
                               yestotal = entry;
                                });
                               
                                var text = fs.readFileSync("nototal.txt").toString('utf-8');
                                var textByLine = text.split("\n")
                                console.log(textByLine);
                                textByLine.forEach(function(entry) {
                                 nototal = entry;
                                  });
                                  var text = fs.readFileSync("table.txt").toString('utf-8');
                                   tab = text; 
                                  console.log(tab);
                                
          
        
    }
    function pubnub(){
        var pubnub = require('pubnub')({
            publish_key: 'pubnub publish key',
            subscribe_key: 'pubnub subscribe key',
            ssl: true
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
function update(){
    if(desbool == 'false'){
        r.getSubmission(dailyp).edit('Hello! the *Jeff Memorial Internet Garden* **WAS NOT** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **GORDON** is currently: **' + soilm + '%** \n \n \n ***** \n please check the soil moisture for Gordon on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](https://cdoern.com/) If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree)
            }
    if(desbool== 'true'){
        r.getSubmission(dailyp).edit('Hello! the *Jeff Memorial Internet Garden* **WAS** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **GORDON** is currently: **' + soilm + '%** \n \n \n ***** \n please check the soil moisture for Gordon on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](https://cdoern.com/) If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment **remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' + tabone + '\n' + tabtwo +'\n' +tabthree)
            }
}

//for webvoting do not use unless you want to use your own website or you can contact me to put it on my website
/*function checkweb(){
  
      var sql = "SELECT count(*) as total FROM yesvotes";
       
      var query = con.query(sql, function(err, result) {
       
       console.log("Total yes votes: " + result[0].total);
        yes = result[0].total;
      });
      var sql = "SELECT count(*) as total FROM novotes";
       
      var query = con.query(sql, function(err, result) {
       
       console.log("Total no  votes: " + result[0].total);
        no =  result[0].total;
        console.log('these is the row count ' +no);
        console.log('this is the last recorded row count '+nototal);

      });
      if(nototal>no){
        nototal = no;
        fs.appendFile('nototal.txt','\n'+nototal, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
    if(yestotal>yes){
        yestotal = yes;
        fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
       if(no > nototal){
       counter--;
       counter3++;
       fs.appendFile('count3.txt','\n'+counter3, function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
         fs.appendFile('count.txt','\n'+counter, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
         nototal=no;
         fs.appendFile('nototal.txt','\n'+nototal, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
         console.log(counter);
       }
       if(yes > yestotal){
        counter++;
        counter2++
        fs.appendFile('count.txt','\n'+counter, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
        yestotal=yes;
        fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
        console.log(counter);
      }
}
//for webvoting do not use unless you want to use your own website or you can contact me to put it on my website
function updateyes(){
    var sql = "DELETE FROM yescounter WHERE message = 'message'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
    var values = [
        [counter2, 'message']
    ]
    var sql = "INSERT INTO yescounter (count, message) VALUES ?";
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

var sql = "DELETE FROM nocounter WHERE message = 'message'";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Number of records deleted: " + result.affectedRows);
});
var values = [
    [counter3, 'message']
]
var sql = "INSERT INTO nocounter (count, message) VALUES ?";
con.query(sql, [values], function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
}
*/

});

