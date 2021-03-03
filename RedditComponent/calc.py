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

yesno = 'not '
f = open("/home/pi/Documents/des.txt", "w")
f.write('0')
f.close()



if counter > 0:
    yesno = ''
    f = open("/home/pi/Documents/des.txt", "w")
    f.write('1')
    f.close()
