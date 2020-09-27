import praw
import re
import string
import time
import pyimgur
from subprocess import call
import datetime
import numpy as np

weatheropts = ['Clear', 'Dry', 'Mild', 'Cloudy', 'Foggy', 'Drizzling', 'Raining', 'Pouring']

rand = np.random.choice(weatheropts, 7, p=[.2, .2, .2, .2, .05, .05, .05, .05])
#print(rand)

f = open("/home/pi/takecareofourplants/daynum.txt", "r")
nums = ''
for x in f:
    nums = x
f.close()
num = int(nums)

if num == 7:
    num = 1;
    open("/home/pi/takecareofourplants/daynum.txt", "w").close();
    f = open("/home/pi/takecareofourplants/daynum.txt", "a")
    f.write('\n' + str(num))
    open("/home/pi/takecareofourplants/weather.txt", "w").close()
    f = open("/home/pi/takecareofourplants/weather.txt", "a")
    for i in rand:
        f.write(i + '\n')
    f.close()
else:
    num = num + 1
    f = open("/home/pi/takecareofourplants/daynum.txt", "a")
    f.write('\n' + str(num))
    f.close()



CLIENT_ID = "246ab90899c251a"
PATH = "/home/pi/takecareofourplants/plant.png"

conditions = ['Wet', 'Moist', 'Normal', 'Normal', 'Dry', 'Too Dry']

reddit = praw.Reddit(client_id="GROOQTDDB22yjw",
                     client_secret="I7r3qT0jLZN90KDu6ltGGDimFEg",
                     user_agent="plantbot",
                     username="takecareofourplants",
                     password="seadawg01")

subreddit = reddit.subreddit('takecareofourplants')

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

f = open("/home/pi/takecareofourplants/count.txt", "a")
num = str(counter)
f.write("\n" + num)
f.close()

call(["node", "/home/pi/takecareofourplants/index2.js"])
time.sleep(15)

f = open("/home/pi/takecareofourplants/currentcondition.txt", "r")
cond = ''
for x in f:
    cond = x
f.close()

im = pyimgur.Imgur(CLIENT_ID)
uploaded_image = im.upload_image(PATH, title="Daily Plant Watering")
print(uploaded_image.link)

d = datetime.datetime.today()

day = d.strftime("%B %d %Y")

reddit.subreddit('takecareofourplants').submit('Daily Plant Watering for ' + day, url=uploaded_image.link).mod.sticky(
    state=True, bottom=False)

time.sleep(4)

for post in reddit.subreddit('takecareofourplants').hot(limit=1):
    post.reply("This is the daily watering post. This plant's life depends on you! \n \n " +
               "The plants current name is: Herbert \n \n" +
               "The current condition is: " + conditions[int(cond)] + "\n \n" +
               "There are 5 conditons... \n \n" +
               "1) Wet **67% - 100%** \n \n" +
               "2) Moist **41% - 66%** \n \n" +
               "3) Normal **23% - 40%** \n \n" +
               "4) Dry **16% - 22%** \n \n" +
               "5) Too Dry **0% - 16%** \n \n" +
               "Each of these conditions counts for a specific and different percentage value. Your goal is to aim for the normal category as much as possible. \n" +
               "You must be careful with watering... each time watered the pump will increase the Soil moisture a random number between 0 and 20. Not watering will cause a daily decrease between 0 and 7 percent. This will not be a simple cycle of watering and not watering. \n" +
               "If the plant remains in the \"Too Dry\" or \"Wet\" sections for 15 days or more... it dies.").mod.distinguish(
        how='yes', sticky=True)



