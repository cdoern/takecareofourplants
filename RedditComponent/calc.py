# coding=utf-8
import praw
import re
import string
import time
from subprocess import call
from datetime import datetime, timedelta
import numpy as np
import random
import csv
import os.path
from textblob import TextBlob

#weather declaration and random generation

conditions = ['Wet', 'Moist', 'Normal', 'Normal', 'Dry', 'Too Dry']

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
currentDay = datetime.today() - timedelta(1)

currentDay = currentDay.strftime("%B %d %Y")

file_exists = os.path.isfile('/home/pi/Documents/voterData.csv')
f = open('/home/pi/Documents/voterData.csv', mode = 'a')
names = ['user','date','vote']
writer = csv.DictWriter(f, fieldnames = names, delimiter = ',', quotechar = '"', quoting = csv.QUOTE_MINIMAL)

if not file_exists:
    writer.writeheader()

counter = 0
voterlist = []
no = [' no ', ' not on your nelly ', ' nein ', ' nyet ', ' nope ']
yes = [' yes ', ' aye ', ' sí ', ' prost ', ' yeah ']

for submission in reddit.subreddit('takecareofourplants').hot(limit=1):
    print(submission.title)
    print(submission.comments.list())
    for comment in submission.comments: #.list():
        if comment.author.name != 'takecareofourplants' and comment.author.name not in voterlist:
            print(comment.author.name)
            #reddit.subreddit("takecareofourplants").flair.set(comment.author.name, "Gardener Extraordinaire", css_class="gardener")
            str1 = comment.body.lower()
            opinion = TextBlob(str1)
            sen = opinion.sentiment.polarity
            str1 = str1.translate(str1.maketrans('', '', string.punctuation))
            str1 = ' ' + str1 + ' '
            for y, n in zip(yes, no):
                if re.findall(y, str1):
                    counter = counter + 1
                    print(comment.body)
                    comment.reply('Thanks for your vote for watering the plant! votes = ' + str(counter))
                    voterlist.append(comment.author.name)
                    writer.writerow({'user':''+str(comment.author.name), 'date': ''+str(currentDay), 'vote':'yes'})
                    break
                if re.findall(n, str1):
                    counter = counter - 1
                    print(comment.body)
                    comment.reply('Thanks for your vote against watering the plant! votes = ' + str(counter))
                    voterlist.append(comment.author.name)
                    writer.writerow({'user':''+str(comment.author.name), 'date': ''+str(currentDay), 'vote':'no'})
                    break
                else:
                    if sen < -.25:
                        counter = counter - 1
                        print(comment.body)
                        comment.reply('Thanks for your vote against watering the plant! votes = ' + str(counter))
                        voterlist.append(comment.author.name)
                        writer.writerow({'user':''+str(comment.author.name), 'date': ''+str(currentDay), 'vote':'no'})
                        break
                    if sen > .25:
                        counter = counter + 1
                        print(comment.body)
                        comment.reply('Thanks for your vote for watering the plant! votes = ' + str(counter))
                        voterlist.append(comment.author.name)
                        writer.writerow({'user':''+str(comment.author.name), 'date': ''+str(currentDay), 'vote':'yes'})
                        break
    print(voterlist)
    subreddit.flair.update(voterlist, text="Gardener Extraordinaire", css_class="gardener")

#end comment scraping to get votes


#getting ready to format post random stuff....
time.sleep(15)

yesno = 'not '
f = open("/home/pi/Documents/des.txt", "w")
f.write('0')
f.close()



if counter > 0:
    yesno = ''
    f = open("/home/pi/Documents/des.txt", "w")
    f.write('1')
    f.close()
