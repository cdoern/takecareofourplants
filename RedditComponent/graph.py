import matplotlib.pyplot as plt
import csv
import numpy as np
import praw
from imgurAuth import authenticate
from redditAuth import auth
from datetime import datetime
import os


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
	plt.figure() # begin drawing a fig
	plt.suptitle('Weekly Voting Data')
	plt.subplot(211) # subplot of yes votes
	plt.ylabel('yes votes')
	plt.yticks(np.arange(0, (max(y1))+1, 1)) # make the y axis tick up by 1 all the day up to max val
	plt.bar(x, y1)

	plt.subplot(212) # subplot of no votes
	plt.ylabel('no votes')
	plt.yticks(np.arange(0, (max(y2))+1, 1)) # make the y axis tick up by 1 all the day up to max val
	plt.bar(x, y2)
	
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
