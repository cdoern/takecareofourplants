# coding=utf-8
import praw
import re
import string
import time
from subprocess import call
import datetime
import numpy as np
import random

#weather declaration and random generation
weatheropts = ['Clear', 'Dry', 'Mild', 'Cloudy', 'Foggy', 'Drizzling', 'Raining', 'Pouring']
conditions = ['Wet', 'Moist', 'Normal', 'Normal', 'Dry', 'Too Dry']

rand = np.random.choice(weatheropts, 7, p=[.2, .2, .2, .2, .05, .05, .05, .05])

#end weather declaration and random generation

#praw setup
reddit = praw.Reddit(client_id="",
                     client_secret="",
                     user_agent="",
                     username="",
                     password="")

subreddit = reddit.subreddit('takecareofourplants')

#end praw setup

#comment scraping to get votes
counter = 0
voterlist = []
no = [' no ', ' not on your nelly ', ' nein ', ' nyet ', ' nope ']
yes = [' yes ', ' aye ', ' sí ', ' prost ']

for submission in reddit.subreddit('takecareofourplants').hot(limit=1):
    print(submission.title)
    print(submission.comments.list())
    for comment in submission.comments: #.list():
        if comment.author.name != 'takecareofourplants' and comment.author.name not in voterlist:
            print(comment.author.name)
            str1 = comment.body.lower()
            str1 = str1.translate(str1.maketrans('', '', string.punctuation))
            str1 = ' ' + str1 + ' '
            for y, n in zip(yes, no):
                if re.findall(y, str1):
                    counter = counter + 1
                    print(comment.body)
                    comment.reply('Thanks for your vote for watering the plant! votes = ' + str(counter))
                    voterlist.append(comment.author.name)
                if re.findall(n, str1):
                    counter = counter - 1
                    print(comment.body)
                    comment.reply('Thanks for your vote against watering the plant! votes = ' + str(counter))
                    voterlist.append(comment.author.name)
    print(voterlist)

#end comment scraping to get votes


#getting ready to format post random stuff....
time.sleep(15)

d = datetime.datetime.today()

day = d.strftime("%B %d %Y")

# default case handling not watered and weather handling

yesno = 'not '

add = random.randint(1, 7)
add = add * -1

#begin weather addition handling
change = 0

weathercond = random.randint(0,7)
if weatheropts.index(rand[weathercond]) < len(weatheropts) / 2:
    change = -1 * random.randint(3, 7)
elif weatheropts.index(rand[weathercond]) > len(weatheropts) / 2 + 1:
    change = random.randint(3,7)

#end weather addition handling


# end default case handling

if counter > 0:
    yesno = ''
    add = random.randint(5, 20)

#end random stuff and var declaration

#soil moisture handling
lines = ''
f = open("/home/pi/takecareofourplants/soilm.txt", "r")
soilmget = ''
for x in f:
    soilmget = x
f.close()
soilm = int(soilmget)
soilm = soilm + add
soilm = soilm + change

f = open("/home/pi/takecareofourplants/soilm.txt", "w")
f.write(str(soilm))
f.close()

#end soil moisture handling

#text post formatting
for i in range(soilm):
    lines += '|'

#for j in range(100-soilm):
#   lines += 'x'


posttext = ('Welcome back... Herbert was ' + yesno + 'watered last cycle \n \n' +
            'The current soil moisture is: \n \n'+ 
            lines + '  **' + str(soilm) +'%** \n \n'+
            'The current weather condition is: \n \n'+ 
            '**'+ rand[weathercond] + '**. This has caused the soil moisture to change by ' + str(change) + '% \n \n \n'+
            '***** \n \n \n'+
            'Herbert\'s life depends on you! \n \n' +
               'His overall current condition is: **' + conditions[round((100/soilm)-1)] + '** \n \n' +
               'There are 5 overall conditions... \n \n' +
               '1) Wet **67% - 100%** \n \n' +
               '2) Moist **41% - 66%** \n \n' +
               '3) Normal **23% - 40%** \n \n' +
               '4) Dry **16% - 22%** \n \n' +
               '5) Too Dry **0% - 16%** \n \n \n' +
               '***** \n \n \n'+
               'Each of these conditions counts for a specific percentage value range. Your goal is to aim for the normal range as much as possible. \n' +
               'You must be careful with watering... each time watered, Herbert\'s soil moisture will increase by 5-20 percent. Each time not watered his soil moisture '+
               'will decrease by 1-7 percent. \n \n'+
               'The current weather condition also either subtracts from, adds to, or maintains the soil moisture. \n \n \n' +
               '[join our discord server!](https://discord.gg/C7F82gU)')
# end text post formatting 

#post submission
reddit.subreddit('takecareofourplants').submit('Daily Plant Watering for ' + day, selftext=''+posttext).mod.sticky(state=True, bottom=False)

for sub in reddit.subreddit('takecareofourplants').new(limit=1):
    sub.mod.flair(text = 'Daily Watering Post')



#end post submission

