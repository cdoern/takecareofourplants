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
    
    fig, axs = plt.subplots(facecolor='w', nrows=2) # Set Up Figure and Subplots
    
    sns.barplot(x=x, y=y1, color=sns.color_palette()[0], ax=axs[0]) # Plot Barplots
    sns.barplot(x=x, y=y2, color=sns.color_palette()[0], ax=axs[1])
    
    axs[0].set_ylabel('Yes Votes') # Clean Y Labels
    axs[1].set_ylabel('No Votes')
    
    max_y = max(max(y1),max(y2)) # Synchronize Axes
    axs[0].set_ylim(0,max_y)
    axs[1].set_ylim(0,max_y)
    
    plt.tight_layout() # Clean Suptitle
    fig.suptitle('Weekly Voting Data', y=1.03)
	
    plt.savefig('/home/pi/Documents/weeklyData.png') # save file
	
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
			currDate = row['date'] # next date
		
	x.append(currDate) # add the last entry to the x vals because the for loop doesnt do it
	y1.append(currYes) # add the last entry to the y vals because the for loop doesnt do it
	y2.append(currNo) # add the last entry to the y vals because the for loop doesnt do it

	drawGraph(x, y1, y2)



def main():

	f = open('/home/pi/Documents/voterData.csv', 'r') # open csv file to read

	gatherData(f)
	
main()
