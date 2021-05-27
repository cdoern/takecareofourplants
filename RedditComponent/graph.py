import matplotlib.pyplot as plt
import seaborn as sns
import csv
import pandas as pd
import numpy as np
import praw
from imgurAuth import authenticate
from redditAuth import auth
from datetime import datetime
import os

sns.set()


def bestUser():
    userList = []


    f = open('/home/pi/Documents/voterData.csv', 'r') # open csv file to read
    reader = csv.DictReader(f) # read is as a dict because of headers to extrap data correctly

    line_count = 0
    
    size = len(list(reader))
    
    f.seek(0)
    reader.__init__(f)

    votecount = [0] * size

    for row in reader:
        if line_count == 0: # headers
            line_count+=1
        if row['user'] in userList:
            print(row['user'])
            ind = userList.index(row['user'])
            votecount[ind]+=1
        if row['user'] not in userList:
            print(row['user'])
            userList.append(row['user'])
            ind = userList.index(row['user'])
            votecount[ind]+=1

    bestUser = userList[votecount.index(max(votecount))]

    return bestUser


def submitReddit(theUrl):
    
    reddit = auth() #reddit data
    subreddit = reddit.subreddit('takecareofourplants')
	
    d = datetime.today()

    day = d.strftime("%B %d %Y")
	
    reddit.subreddit('takecareofourplants').submit('Weekly Voting Data for ' + day, url=''+theUrl) # submit weekly image to subreddit
    
    os.rename("/home/pi/Documents/voterData.csv", "/home/pi/oldData/voterData"+day+".csv")


def uploadImage():
    album = None # You can also enter an album ID here
    image_path = '/home/pi/Documents/weeklyData.png'
    client = authenticate() # imgur client data

    config = {
        'album': album,
        'name':  'Weekly Voting Data',
        'title': 'Weekly Voting Data',
        'description': 'Weekly voting data for' +str((datetime.now()))
        }

    print("Uploading image... ")
    image = client.upload_from_path(image_path, config=config, anon=False) # upload to imgur
    print(image['link'])
    theUrl = image['link']
    print("Done")
    submitReddit(theUrl)

def drawGraph(x, y1, y2):
        x = pd.to_datetime(pd.Series(x)).dt.strftime('%b-%d') # Clean Up X Labels

	data = pd.DataFrame([y1, y2]).transpose() # organize the data in df
	data[2] = x
	data.columns = ['Yes', 'No', 'date']
	data = data.melt(id_vars=['date'])
	data.columns = ['date', 'Vote Type', 'value']

	fig = sns.barplot(x='date', y='value', hue='Vote Type', data=data) # plot barplot

	fig.set_ylabel("# Votes")

	max_y = max(data.value)

	fig.set_ylim(0,max_y+1)

	user = bestUser()

	plt.tight_layout() # clean title
	fig.set_title('Weekly Voting Data')

	fig.legend(loc='upper right') # locks legend loc to upper left

	fig.text(0.25, max_y+0.5, "The user with the most votes was: u/"+user, fontsize = 10)

        plt.savefig('/home/pi/Documents/weeklyData.png', bbox_inches='tight') # save file

        uploadImage()

#plt.show()


def gatherData(f):

    x = []
    y1 = []
    y2 = []

    reader = csv.DictReader(f) # read is as a dict because of headers to extrap data correctly

    line_count = 0
    currDate = ''
    currYes = 0
    currNo = 0

    for row in reader:
        if line_count == 0: # headers
            print(row)
            line_count += 1
            currDate = row['date']
            print(currDate)
        if currDate == row['date']: # if still processing the same day
            if row['vote'] == 'yes':
                currYes += 1 # total yes votes inc
            if row['vote'] == 'no':
                currNo += 1 # total no votes inc
        if currDate != row['date']: # if we are now onto the next date
            x.append(currDate) # add to the graph x values
            y1.append(currYes) # add to the graphs y values
            y2.append(currNo) # add to the graphs y values
            currYes = 0 # reset
            currNo = 0 # reset
            if row['vote'] == 'yes':
                currYes += 1 # total yes votes inc
            if row['vote'] == 'no':
                currNo += 1 # total no votes inc
            currDate = row['date'] # next date
    	
    x.append(currDate) # add the last entry to the x vals because the for loop doesnt do it
    y1.append(currYes) # add the last entry to the y vals because the for loop doesnt do it
    y2.append(currNo) # add the last entry to the y vals because the for loop doesnt do it

    drawGraph(x, y1, y2)



def main():

    f = open('/home/pi/Documents/voterData.csv', 'r') # open csv file to read

    gatherData(f)
	
main()
