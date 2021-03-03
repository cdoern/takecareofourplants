clientid ="bot client id";
clientsec="bot client secret"; 
user="bot user";    
pass="bot pass";   
require('dotenv').config();
var five = require('johnny-five');
var sleep = require('system-sleep');
counter = 0;
var alreadyhumid = 'false';
var fortable = [];
var no = 0;
var yes = 0;
var doit= true;
var csv = require('csv');
var fs = require('fs');
var daily = '';
var yestotal = 0;
var tab = '';
var nototal= 0;
var postit = 0;
var postmessage = '';
var justposted = true;
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
var temp;
var humidity;
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
var board = new five.Board();
var moment = require('moment');
board.on("ready", function() {
var pin = new five.Pin({
    pin: "A2",
  });
  var pin2 = new five.Pin({
    pin: "A0",
  });
    var humid = new five.Led({
    pin: 12,
  });
var led = new five.Led({
        pin: 13,
      });
 setInterval(soil, 1200000);
setInterval(checkhumid, 2700000);
setInterval(filesoilm, 300000);
setInterval(update, 240000);
setInterval(checktime, 1000);
//setInterval(pubnub, 30000);
setInterval(files, 60000);
pin.read(function(error, value) {
    soilm=(((value-540)/(260-540))*100);
   soilm=Math.round(soilm);
})
pin2.read(function(error, value) {
    soilm2=(((value-540)/(260-540))*100);
   soilm2=Math.round(soilm2);
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
soil();
//updateyes();
files();
update();
loadnew();
sleep(4000);
checkhumid();
  if(desbool == 'true'){
 humid.on();
  }
//water();
const comments = client.CommentStream(streamOpts);
comments.on('comment', (comment) => {
if(comment.body == "Yes votes | No votes \n -----------|------------ \n 0|0"){
     theid = comment.id;
     fs.appendFile('comments.txt','\n'+theid, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
     r.getComment(comment.id).distinguish({status: true, sticky: true})
    //console.log(theid);
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
            postlist.push(post.link_title);
            fs.appendFile('post.txt','\n'+post.link_title, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            var daily = post.link_id;
            daily = daily.substring(3);
            //console.log(daily);
            //console.log(postlist);
});
    });
   dailyp = comment.link_id;
    //console.log(dailyp);
    dailyp = dailyp.substring(3);
    fs.appendFile('dailypostid.txt','\n'+dailyp, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
fs.writeFile('peopleday.txt','', function (err) {
        if (err) throw err;
      });
}
if(comment.body == "remove from list"){
    r.getNewComments('takecareofourplants', {limit: 1}).then(function(posts){
        posts.forEach(function (post){
        if(post.link_title == "List removal request post"){
            nomessage.push(comment.author.name);
            fs.appendFile('nomessage.txt','\n'+(comment.author.name), function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            //console.log(nomessage);
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
        //console.log('Updated!'); 
      });
 //   tab=tab+ '\n\n';
    tabtwo = tabtwo + '--';
    for(var j = 0; j <= len; j++){
       tabtwo = tabtwo + ('|--');
   }
   fs.writeFile('t2.txt',tabtwo,function(err){
    if (err) throw err;
    //console.log('Updated!'); 
  });
 //  tab= tab +'\n\n';
   tabthree = tabthree + fortable[num-7];
    for(var i = (num-6); i <= num; i++){
        tabthree = tabthree + (' | ' + fortable[i]);
    } 
    fs.writeFile('t3.txt',tabthree,function(err){
        if (err) throw err;
        //console.log('Updated!'); 
      });

    }
if(checkforval(comment.body) == true && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0") {

    r.getNewComments('takecareofourplants',{limit: 1}).then(function (posts){
 //   r.getSubmission(dailyp).fetch().then(function (submission) { 
     //   submission.comments.forEach(function (comment){
   // r.getSubmission(dailyp).expandReplies().then(function (comments){
        posts.forEach(function (post){
     if(postlist.includes(post.link_title) || postdaily == (post.link_title)){
          //console.log(post.link_title);
          r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
          listcheck(comment.author.name);
          //console.log(voterlist);
          if(listcheck2(comment.author.name) == true){
    //console.log('yes vote');
    counter++;
    fs.appendFile('count.txt','\n'+counter, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
    counter2++
    fs.appendFile('count2.txt','\n'+counter2, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
    comment.reply('Thanks for your vote to water! votes = ' + counter);
    r.getComment(theid).edit("Yes votes | No votes \n -----------|------------ \n" + counter2 +"|"+counter3)
      }
     else if(listcheck2(comment.author.name) == false){
         //console.log('repeat voter');
    }
}
     // else{
          //console.log('not right post');
     // }
    });
}); 
   //})
}

else if(checkforval(comment.body) == false && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0"){ 
    r.getNewComments('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
      if(postlist.includes(post.link_title) || postdaily == (post.link_title)){
          //console.log(post.link_title);
          r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
          listcheck(comment.author.name);
          if(listcheck2(comment.author.name) == true){
    //console.log('no vote');

    counter--;
    fs.appendFile('count.txt','\n'+counter, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
    counter3++;
    fs.appendFile('count3.txt','\n'+counter3, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
    comment.reply('Thanks for your vote against watering the plant! votes = ' + counter);
    r.getComment(theid).edit("Yes votes | No votes \n -----------|------------ \n" + counter2 +"|"+counter3)
          }
          else if(listcheck2(comment.author.name) == false){
              //console.log("repeat voter");
          }
      }
      else{
          //console.log('not right post');
      }
    });
});
}
function checkforval(x) {
    commentfin = x.toLowerCase();
    if(commentfin == 'yes' || commentfin.includes(' yes ') || commentfin.includes('yes ') ||commentfin.includes('prost') || commentfin.includes('aye') || commentfin.includes('sí')){
        return true;
        //console.log('true');
    }
    else if(commentfin == 'no' || commentfin.includes(' no ') || commentfin.includes('no ') || commentfin.includes('nein') || commentfin.includes('not on your nelly') || commentfin.includes('nyet')){
        return false;
        //console.log(false);
    }
        
    }

});
    function checktime() {
        //console.log(day);
 console.log(moment().format('LTS'));
        if(moment().format('LTS') === '12:00:00 AM'){
            //console.log('message cleared');
            console.log(moment().format('LTS'));
            messagesoil ='';
            messagesoil = ("\n \n" + "- "  +"__"+time+"__" +": "+ soilm+"%") + messagesoil
            r.getSubmission('8csxtn').edit(messagesoil)
        }
        if((moment().format('LTS') === '6:40:00 AM' && counter > 0)){    
	    alreadyhumid = 'false'; 
 fs.appendFile('humidbool.txt','\n'+alreadyhumid, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });       
	    postit = 0;
            fs.appendFile('postit.txt','\n'+postit, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
              yestotal= 0;
              fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
               if (err) throw err;
                //console.log('Updated!');
              });
              nototal = 0;
             fs.appendFile('nototal.txt','\n'+nototal, function (err) {
                if (err) throw err;
                cnsole.log('Updated!');
              });
            counter = 0;
            fs.appendFile('count.txt','\n'+counter, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            counter2 = 0;
            fs.appendFile('count2.txt','\n'+counter2, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            counter3 = 0;
            fs.appendFile('count3.txt','\n'+counter3, function (err) {
                if (err) throw err;
                //console.log('Updated!');
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
                //console.log('Updated!');
              });
            editmessage();
            day = moment().format('dddd');
            fs.appendFile('day.txt','\n'+day, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            r.getSubreddit('takecareofourplants')
            .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water the Garden today?', text: 'Hello! the *Jeff Memorial Internet Garden* **WAS** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **MARTY** is currently: **' + soilm + '%** \n \n The Soil Moisture for **GENDO** is currently: **'+soilm2+'%** \n \n The humidity indoors is currently: **'+humidity+'** \n \n The temperature indoors is currently: **'+temp+'** \n \n ***** \n please check the soil moisture for Marty on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](http://www.takecareofourplants.com) **If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree})          
            .sticky()
             .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
             counter = 0;
             fs.appendFile('count.txt','\n'+counter, function (err) {
                 if (err) throw err;
                 //console.log('Updated!');
               });
             counter2 = 0;
             fs.appendFile('count2.txt','\n'+counter2, function (err) {
                 if (err) throw err;
                 //console.log('Updated!');
               });
             counter3 = 0;
             fs.appendFile('count3.txt','\n'+counter3, function (err) {
                 if (err) throw err;
                 //console.log('Updated!');
               });
             sendreminders();
             led.off();
             justposted = false;
             sleep(5000);
             led.off();
             files();
         }   

        else if((moment().format('LTS') === '6:40:00 AM' && counter <= 0)){   
            postit = 0;
            fs.appendFile('postit.txt','\n'+postit, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            yestotal= 0;
              fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
              nototal = 0;
              fs.appendFile('nototal.txt','\n'+nototal, function (err) {
                if (err) throw err;
              //console.log('Updated!');
            });
            counter = 0;
            fs.appendFile('count.txt','\n'+counter, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            counter2 = 0;
            fs.appendFile('count2.txt','\n'+counter2, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            counter3 = 0;
            fs.appendFile('count3.txt','\n'+counter3, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
           postlist = [];
           dailyvoterlist = [];
            des = 'no'
            desbool = 'false';
            fs.appendFile('desbool.txt','\n'+desbool, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
           editmessage();
            day = moment().format('dddd');
            fs.appendFile('day.txt','\n'+day, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              });
            //console.log('message for no sent');
          r.getSubreddit('takecareofourplants')
          .submitSelfpost({title: 'Hello! Today is ' + moment().format('LL') + '. Would you like to water the Garden today?', text: 'Hello! the *Jeff Memorial Internet Garden* **WAS NOT** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **MARTY** is currently: **' + soilm + '%** \n \n The Soil Moisture for **GENDO** is currently: **'+soilm2+'%** \n \n The humidity indoors is currently: **'+humidity+'** \n \n The temperature indoors is currently: **'+temp+'** \n \n ***** \n please check the soil moisture for Marty on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](http://www.takecareofourplants.com) **If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree})          
          .sticky()
       .reply('Yes votes | No votes \n -----------|------------ \n 0|0')
       counter = 0;
       fs.appendFile('count.txt','\n'+counter, function (err) {
           if (err) throw err;
           //console.log('Updated!');
         });
       counter2 = 0;
       fs.appendFile('count2.txt','\n'+counter2, function (err) {
           if (err) throw err;
           //console.log('Updated!');
         });
       counter3 = 0;
       fs.appendFile('count3.txt','\n'+counter3, function (err) {
           if (err) throw err;
           //console.log('Updated!');
         });
      sendreminders();
      justposted = false;
       sleep(5000);
       
        }
        else {
            //console.log('not time yet');
        }
    }

    function initialpost() {
    r.getHot('takecareofourplants', {limit: 1}).then(function (posts){
        posts.forEach(function (post){
            postlist.push(post.title);
            //console.log(postlist);
        });
    });
}
   function filesoilm(){
        var date = moment().format("YYYY-MM-DD HH:mm");
        fs.appendFile('soilm.txt',soilm+','+date+'\n', function (err) {
            if (err) throw err;
          });
  	var date = moment().format("YYYY-MM-DD HH:mm");
        fs.appendFile('soilm2.txt',soilm2+','+date+'\n', function (err) {
            if (err) throw err;
          });
    }

function water(){
led.on();
sleep(25000);
led.off();
}
function editmessage(){
    var tabone = '';
    var tabtwo = '';
    var tabthree = '';
    fs.unlink('t1.txt', function (err) {
        if (err) throw err;
        //console.log('File deleted!');
      });
      fs.unlink('t2.txt', function (err) {
        if (err) throw err;
        //console.log('File deleted!');
      });
      fs.unlink('t3.txt', function (err) {
        if (err) throw err;
        //console.log('File deleted!');
      });
    if(descount>=7){
    fortable.shift();
        fs.appendFile('trend.txt','-'+des, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });  
          descount++;
          fs.writeFile('desc.txt','\n'+descount,function(err){
            if (err) throw err;
            //console.log('Updated!'); 
          });
    }
    fortable.push(des);
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
         //console.log('Updated!'); 
       });
     tabtwo = tabtwo + '--';
     for(var j = 0; j <= len; j++){
        tabtwo = tabtwo + ('|--');
    }
    fs.writeFile('t2.txt',tabtwo,function(err){
     if (err) throw err;
     //console.log('Updated!'); 
   });
    tabthree = tabthree + fortable[num-7];
     for(var i = (num-6); i <= num; i++){
         tabthree = tabthree + (' | ' + fortable[i]);
     } 
     fs.writeFile('t3.txt',tabthree,function(err){
         if (err) throw err;
         //console.log('Updated!'); 
       });
    
}
function sendreminders(){
  dailyvoterlist.forEach(function(entry) {
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
function listcheck(x){
    if(voterlist.includes(x)){
        //console.log('already added');
    }
    else{
        voterlist.push(x);
        //console.log(voterlist);
        fs.appendFile('people.txt','\n'+x, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
    }
}
function listcheck2(x){
if(dailyvoterlist.includes(x)){
    //console.log('already voted');
    //console.log(dailyvoterlist);
    return(false);
}
else{
    //console.log('not voted yet');
    dailyvoterlist.push(x);
    fs.appendFile('peopleday.txt','\n'+x,function(err){
        if (err) throw err;
        //console.log('Updated!'); 
     });
    //console.log(dailyvoterlist);
    return(true);
}

}

function soil(){
    var time = moment().format('lll');
    //console.log(soilm);
     messagesoil = ("\n \n" + "- "  +"__"+time+"__" +": "+ soilm+"%") + messagesoil;
     r.getSubmission('8csxtn').edit(messagesoil)
    }
    function files(){
        var text = fs.readFileSync("count.txt").toString('utf-8');
        var textByLine = text.split("\n")
        //console.log(textByLine);
        textByLine.forEach(function(entry) {
         counter = entry;
          });
          console.log('done');
var text = fs.readFileSync("humid.txt").toString('utf-8');
        var textByLine = text.split("\n")
        //console.log(textByLine);
        textByLine.forEach(function(entry) {
         humidity = entry;
          });
          console.log('done');

var text = fs.readFileSync("temp.txt").toString('utf-8');
        var textByLine = text.split("\n")
        //console.log(textByLine);
        textByLine.forEach(function(entry) {
         temp = entry;
          });
          console.log('done');

var text = fs.readFileSync("humidbool.txt").toString('utf-8');
        var textByLine = text.split("\n")
        //console.log(textByLine);
        textByLine.forEach(function(entry) {
         alreadyhumid = entry;
          });
          console.log('done');

          var text = fs.readFileSync("postit.txt").toString('utf-8');
          var textByLine = text.split("\n")
          //console.log(textByLine);
          textByLine.forEach(function(entry) {
           postit = entry;
            });
            console.log('done');

          voterlist=[];
          var text = fs.readFileSync("people.txt").toString('utf-8');
          var textByLine = text.split("\n")
          //console.log(textByLine);
          textByLine.forEach(function(entry) {
          voterlist.push(entry);
            });
            console.log('done');

           dailyvoterlist=[];
           var text = fs.readFileSync("peopleday.txt").toString('utf-8');
           var textByLine = text.split("\n")
            //console.log(textByLine);
           textByLine.forEach(function(entry) {
            dailyvoterlist.push(entry);
              });
              console.log('done');

          
            var text = fs.readFileSync("post.txt").toString('utf-8');
            var textByLine = text.split("\n")
            //console.log(textByLine);
            textByLine.forEach(function(entry) {
             postdaily = entry;
              });
              console.log('done');

             
              var text = fs.readFileSync("comments.txt").toString('utf-8');
              var textByLine = text.split("\n")
              //console.log(textByLine);
              textByLine.forEach(function(entry) {
               theid = entry;
                });
                console.log('done');

               
                var text = fs.readFileSync("count2.txt").toString('utf-8');
                var textByLine = text.split("\n")
                //console.log(textByLine);
                textByLine.forEach(function(entry) {
                 counter2 = entry;
                  });
                  console.log('done');

                  var text = fs.readFileSync("count3.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  //console.log(textByLine);
                  textByLine.forEach(function(entry) {
                   counter3 = entry;
                    });
                    console.log('done');

                    nomessage=[];
                    var text = fs.readFileSync("nomessage.txt").toString('utf-8');
                  var textByLine = text.split("\n")
                  //console.log(textByLine);
                  textByLine.forEach(function(entry) {
                   nomessage.push(entry);
                    });
                    console.log('done');

                  weeklydes = [];
                    var text = fs.readFileSync("trend.txt").toString('utf-8');
                    var textByLine = text.split("-")
                    //console.log(textByLine);
                    message = '';
                    fortable = [];
                    textByLine.forEach(function(entry) {
                    fortable.push(entry);
                     message = message + '\n'+entry;
                      });
                      console.log('done');

                      var text = fs.readFileSync("pasttrend.txt").toString('utf-8');
                      var textByLine = text.split("\n")
                      //console.log(textByLine);
                      pastdesmessage = '';
                      textByLine.forEach(function(entry) {
                       pastdesmessage = pastdesmessage + '\n'+entry;
                        });
                        console.log('done');

                        var text = fs.readFileSync("desc.txt").toString('utf-8');
                        var textByLine = text.split("\n")
                        //console.log(textByLine);
                        textByLine.forEach(function(entry) {
                         descount = entry;
                          });
                          console.log('done');

                          var text = fs.readFileSync("day.txt").toString('utf-8');
                          var textByLine = text.split("\n")
                          //console.log(textByLine);
                          textByLine.forEach(function(entry) {
                           day = entry;
                            });
                            console.log('done');

                            var text = fs.readFileSync("dailypostid.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            //console.log(textByLine);
                            textByLine.forEach(function(entry) {
                             dailyp = entry;
                              });
                              console.log('done');

                              var text = fs.readFileSync("t1.txt").toString('utf-8');
                              tabone = text;
                              console.log('done');

                              //console.log(tabone);
                              var text = fs.readFileSync("t2.txt").toString('utf-8');
                              tabtwo = text;
                              console.log('done');

                              //console.log(tabtwo);
                              var text = fs.readFileSync("t3.txt").toString('utf-8');
                              tabthree = text;
                              console.log('done');
                             // ee);
                             
                              var text = fs.readFileSync("desbool.txt").toString('utf-8');
                            var textByLine = text.split("\n")
                            //console.log(textByLine);
                            textByLine.forEach(function(entry) {
                             desbool = entry;
                              });
                              console.log('done');

                              var text = fs.readFileSync("yestotal.txt").toString('utf-8');
                              var textByLine = text.split("\n")
                              //console.log(textByLine);
                              textByLine.forEach(function(entry) {
                               yestotal = entry;
                                });
                                console.log('done');

                                var text = fs.readFileSync("nototal.txt").toString('utf-8');
                                var textByLine = text.split("\n")
                                //console.log(textByLine);
                                textByLine.forEach(function(entry) {
                                 nototal = entry;
                                  });
                                  console.log('done');

                              
                                
          
        
    }
    function pubnub(){
        var pubnub = require('pubnub')({
            publish_key: 'publish key',
            subscribe_key: 'subscribe key',
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
        r.getSubmission(dailyp).edit('Hello! the *Jeff Memorial Internet Garden* **WAS NOT** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **MARTY** is currently: **' + soilm + '%** \n \n The Soil Moisture for **GENDO** is currently: **'+soilm2+'%** \n \n The humidity indoors is currently: **'+humidity+'** \n \n The temperature indoors is currently: **'+temp+'** \n \n ***** \n please check the soil moisture for Marty on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](http://www.takecareofourplants.com) **If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree)
            }
    if(desbool== 'true'){
        r.getSubmission(dailyp).edit('Hello! the *Jeff Memorial Internet Garden* **WAS** watered last cycle. \n The time is currently: **' + moment().format('LTS')+ '** in New York. \n \n The Soil Moisture for **MARTY** is currently: **' + soilm + '%** \n \n The Soil Moisture for **GENDO** is currently: **'+soilm2+'%** \n \n The humidity indoors is currently: **'+humidity+'** \n \n The temperature indoors is currently: **'+temp+'** \n \n ***** \n please check the soil moisture for Marty on the stickied post titled [Soil Moisture](https://www.reddit.com/r/takecareofourplants/comments/8csxtn/soil_moisture/) or on [my website](http://www.takecareofourplants.com) **If you received a voting reminder and would like to be taken off of the PM list, go to the post titled, [List removal request post](https://www.reddit.com/r/takecareofourplants/comments/9i8trd/list_removal_request_post/) and comment remove from list**. \n ***** \n You can currently say **yes, prost, sí, and aye** to water the plant and **no, nein, nyet, and not on your nelly** to not water the plant. These **ARE NOT** case sensetive! **ANY** of these words can be placed throughout a sentence and the bot will register the vote!'+ '\n ***** ' + '\n **Weekly Trend** \n \n \n' +  tabone + '\n' + tabtwo +'\n' +tabthree)
            }
}
function checkhumid(){
console.log(alreadyhumid);
if(desbool == 'true' && alreadyhumid == 'false'){
humid.on();
alreadyhumid = 'true';
fs.appendFile('humidbool.txt','\n'+alreadyhumid, function (err) {
                if (err) throw err;
                //console.log('Updated!');
              }); 
}
else{
humid.off();
}
}
function csvcheck(){
var csv = require('csv');
var date = moment().format("YYYY-MM-DD HH:mm");
var obj = csv()
var dataInfo = [
[date, soilm]
];
obj.from.array(dataInfo).to.path('soil.csv');
}
function checkweb(){
  
      var sql = "SELECT count(*) as total FROM yesvotes";
       
      var query = con.query(sql, function(err, result) {
       
       //console.log("Total yes votes: " + result[0].total);
        yes = result[0].total;
      });
      var sql = "SELECT count(*) as total FROM novotes";
       
      var query = con.query(sql, function(err, result) {
       
       //console.log("Total no  votes: " + result[0].total);
        no =  result[0].total;
        //console.log('these is the row count ' +no);
        //console.log('this is the last recorded row count '+nototal);

      });
      if(nototal>no){
        nototal = no;
        fs.appendFile('nototal.txt','\n'+nototal, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
    }
    if(yestotal>yes){
        yestotal = yes;
        fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
    }
       if(no > nototal){
       counter--;
       counter3++;
       fs.appendFile('count3.txt','\n'+counter3, function (err) {
        if (err) throw err;
        //console.log('Updated!');
      });
         fs.appendFile('count.txt','\n'+counter, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
         nototal=no;
         fs.appendFile('nototal.txt','\n'+nototal, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
         //console.log(counter);
       }
       if(yes > yestotal){
        counter++;
        counter2++
        fs.appendFile('count.txt','\n'+counter, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
        yestotal=yes;
        fs.appendFile('yestotal.txt','\n'+yestotal, function (err) {
            if (err) throw err;
            //console.log('Updated!');
          });
        //console.log(counter);
      }
}

function updateyes(){
    var sql = "DELETE FROM yescounter WHERE message = 'message'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("Number of records deleted: " + result.affectedRows);
    });
    var values = [
        [counter2, 'message']
    ]
    var sql = "INSERT INTO yescounter (count, message) VALUES ?";
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
});
}
function loadnew(){
    // function loadnew(){
         console.log('success');
    if(justposted){
         r.getSubmission(dailyp).fetch().then(function (submission) { 
             submission.comments.forEach(function (comment){
                 if(checkforval(comment.body) == true && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0") {
                 console.log('yes');
               r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
               listcheck(comment.author.name);
               //console.log(voterlist);
               if(listcheck2(comment.author.name) == true){
         //console.log('yes vote');
         counter++;
         fs.appendFile('count.txt','\n'+counter, function (err) {
             if (err) throw err;
             //console.log('Updated!');
           });
         counter2++
         fs.appendFile('count2.txt','\n'+counter2, function (err) {
             if (err) throw err;
             //console.log('Updated!');
           });
         comment.reply('Thanks for your vote to water! votes = ' + counter);
         r.getComment(theid).edit("Yes votes | No votes \n -----------|------------ \n" + counter2 +"|"+counter3)
           }
          else if(listcheck2(comment.author.name) == false){
              //console.log('repeat voter');
         }
         }
         
         else if(checkforval(comment.body) == false && comment.body != "Yes votes | No votes \n -----------|------------ \n 0|0"){ 
             console.log('no');    
             r.getUser(comment.author.name).assignFlair({subredditName: 'takecareofourplants', text: "Gardener Extraordinaire", cssClass: "gardener"})
                   listcheck(comment.author.name);
                   if(listcheck2(comment.author.name) == true){
             //console.log('no vote');
             counter--;
             fs.appendFile('count.txt','\n'+counter, function (err) {
                 if (err) throw err;
                 //console.log('Updated!');
               });
             counter3++;
             fs.appendFile('count3.txt','\n'+counter3, function (err) {
                 if (err) throw err;
                 //console.log('Updated!');
               });
             comment.reply('Thanks for your vote against watering the plant! votes = ' + counter);
             r.getComment(theid).edit("Yes votes | No votes \n -----------|------------ \n" + counter2 +"|"+counter3)
                   }
                   else if(listcheck2(comment.author.name) == false){
                       //console.log("repeat voter");
                   }
               }
             });
         });
         //}
         doit ==false;
   //  }
        }
 }
 function listcheck(x){
     if(voterlist.includes(x)){
         //console.log('already added');
     }
     else{
         voterlist.push(x);
         //console.log(voterlist);
         fs.appendFile('people.txt','\n'+x, function (err) {
             if (err) throw err;
             //console.log('Updated!');
           });
     }
 }
 function listcheck2(x){
 if(dailyvoterlist.includes(x)){
     //console.log('already voted');
     //console.log(dailyvoterlist);
     return(false);
 }
 else{
     //console.log('not voted yet');
     dailyvoterlist.push(x);
     fs.appendFile('peopleday.txt','\n'+x,function(err){
         if (err) throw err;
         //console.log('Updated!'); 
      });
     //console.log(dailyvoterlist);
     return(true);
 }
 
 }
 function checkforval(x){
 commentfin = x.toLowerCase();
 if(commentfin == 'yes' || commentfin.includes(' yes ') || commentfin.includes('yes ') ||commentfin.includes('prost') || commentfin.includes('aye') || commentfin.includes('sí')){
     return true;
     //console.log('true');
 }
 else if(commentfin == 'no' || commentfin.includes(' no ') || commentfin.includes('no ') || commentfin.includes('nein') || commentfin.includes('not on your nelly') || commentfin.includes('nyet')){
     return false;
     //console.log(false);
 }

     
 }
});
