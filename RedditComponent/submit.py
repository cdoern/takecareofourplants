# coding=utf-8
import praw
import re
import string
import time
from subprocess import call
import datetime
import numpy as np
import random

#praw setup
reddit = praw.Reddit(client_id="",
                     client_secret="",
                     user_agent="",
                     username="",
                     password="")

subreddit = reddit.subreddit('takecareofourplants')

#end praw setup


# misc formatting stuff

soilm = ''
soilmInt = 0

yesno = 'not '
des = ''
desInt = 0

d = datetime.datetime.today()

day = d.strftime("%B %d %Y")

# end misc formatting stuff

#determine whether or not to water...

f = open("/home/pi/Documents/des.txt", "r")
des = f.readline()
desInt = int(des)

if desInt != 0:
    yesno = ''

#read soil moisture

f = open("/home/pi/Documents/soilm.txt", "r")
soilm = f.readline()
soilmInt = int(soilm)

if soilmInt < 60:
    soilm = 'DRY'
if soilmInt >= 60:
    soilm = 'WET'

#end soil moisture handling

#text post formatting
for i in range(soilmInt):
    lines += '|'

posttext = ('Welcome back... Phil was ' + yesno + 'watered last cycle. Would you like to water Phil today? \n \n' +
            'The current soil moisture is: \n \n'+ 
            lines + ' **'+ str(soilmInt) +'%** ('+ str(soilm) +') \n \n'+
            'You can use the following words and phrases to vote: \n \n'+
            '**Yes vote**: yes, aye, sí, prost \n \n'+
            '**No vote**: no, not on your nelly, nein, nyet, nope \n \n'+
            'Phil\'s life depends on you! \n \n' +
            'Phil is a **Philodendron** plant who\'s care rotuine can be found [here](https://www.thespruce.com/grow-philodendron-houseplants-1902768) but to summarize... \n \n'
            'Philodendrons prefer: \n \n'+
            '1) Medium Sunlight (not too close to the windowsill but always exposed to light) \n \n'+
            '2) The **top 2 inches of their soil to be wet**. we will have to figure out what type of watering cycle allows this... \n \n'+
            '3) A temperature of 55 degrees Fahrenheit \n \n'+
            '4) They respond poorly to both over and underwatering. The leaves droop in similar ways in each of these circumstances so focus on the soil moisture and the cycle! \n'+
             #  'His overall current condition is: **' + conditions[round((100/soilm)-1)] + '** \n \n' +
             #  'There are 5 overall conditions... \n \n' +
             #  '1) Wet **67% - 100%** \n \n' +
             #  '2) Moist **41% - 66%** \n \n' +
             #  '3) Normal **23% - 40%** \n \n' +
             #  '4) Dry **16% - 22%** \n \n' +
             #  '5) Too Dry **0% - 16%** \n \n \n' + 
            '***** \n \n \n'+
            'If you choose to water Phil, the pump turns on for about 7 seconds dispensing approximately **8 fl oz or 1 cup of water** \n \n'+ 
             # 'Each of these conditions counts for a specific percentage value range. Your goal is to aim for the normal range as much as possible. \n \n' +
               '[join our discord server!](https://discord.gg/C7F82gU)')
# end text post formatting 

#post submission
reddit.subreddit('takecareofourplants').submit('Daily Plant Watering for ' + day, selftext=''+posttext).mod.sticky(state=True, bottom=False)

for sub in reddit.subreddit('takecareofourplants').new(limit=1):
    sub.mod.flair(text = 'Daily Watering Post')
#end post submission
