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

import glob


def mostAccurate(userAccuracy):

    index = 0
    maxm = 0

    for ind, amount in enumerate(userAccuracy):
        if amount > maxm:
            maxm = amount
            index = ind
    return index

def mostVotes(userVotes):
    index = 0
    maxm = 0

    for ind, amount in enumerate(userVotes):
        if amount > maxm:
            maxm = amount
            index = ind
    return index

def submitReddit(theUrl):
    
    reddit = auth() #reddit data
    subreddit = reddit.subreddit('takecareofourplants')
	
    d = datetime.today()

    day = d.strftime("%B %d %Y")
	
    reddit.subreddit('takecareofourplants').submit('Cumulative Voting Data for ' + day, url=''+theUrl) # submit image to subreddit
    
    #os.rename("/home/pi/Documents/voterData.csv", "/home/pi/oldData/voterData"+day+".csv")

def uploadImage():
    album = None # You can also enter an album ID here
    image_path = '/home/pi/Documents/totalData.png'
    client = authenticate() # imgur client data

    config = {
        'album': album,
        'name':  'Cumulative Voting Data',
        'title': 'Cumulative Voting Data',
        'description': 'Cumulative voting data for' +str((datetime.now()))
        }

    print("Uploading image... ")
    image = client.upload_from_path(image_path, config=config, anon=False) # upload to imgur
    print(image['link'])
    theUrl = image['link']
    print("Done")
    submitReddit(theUrl)


def graph(totalNoVotes, totalYesVotes, timesWatered, timesNotWatered, users, usersAccuracy, usersVotes):
    print('in graph')
    x1 = ['yes votes', 'no votes']
    y1 = [totalYesVotes, totalNoVotes]

    x2 = ['times watered', 'times not watered']
    y2 = [timesWatered, timesNotWatered]

    fig, axs = plt.subplots(facecolor='w', nrows=2) # Set Up Figure and Subplots

    plt.margins(x=0, y =100)
    
    sns.barplot(x=x1, y=y1, color=sns.color_palette()[0], ax=axs[0]) # Plot Barplots
    sns.barplot(x=x2, y=y2, color=sns.color_palette()[0], ax=axs[1])

    axs[0].set_ylabel('vote number') # Clean Y Labels
    axs[1].set_ylabel('total times')

    max_y = max(y1)+1 # Synchronize Axes
    max_y2 = max(y2)+1
    axs[0].set_ylim(0,max_y)
    axs[1].set_ylim(0,max_y2)

    plt.tight_layout() # Clean Suptitle
    fig.suptitle('Cumulative Voting Data', y=1.01)

    userAcc = users[mostAccurate(usersAccuracy)]

    userVotes = users[mostVotes(usersVotes)]

    

    axs[0].text(-.1, max(y1)+45, "The user with the most accurate votes was: u/"+userAcc, fontsize = 10)

    axs[0].text(-.1, max(y1)+25, "The user with the most votes was: u/"+userVotes, fontsize = 10)

    print('about to save pic')
    
    plt.savefig('/home/pi/Documents/totalData.png', bbox_inches='tight') # save file

    uploadImage()

def mostAccurateDay(fi, voteCount, curr_date):
    print(curr_date)
    f = open(fi, 'r')
    reader = csv.DictReader(f)

    line_count = 0

    userList = []

    for row in reader:
        if line_count == 0:
            line_count+=1
        if row['date'] != curr_date:
            continue
        if row['vote'] == 'no' and voteCount <= 0:
            userList.append(row['user'])
        if row['vote'] == 'yes' and voteCount > 0:
            userList.append(row['user'])
    return userList


def determine(fi, curr_date):
    f = open(fi, 'r')
    reader = csv.DictReader(f)

    line_count = 0

    voteCount = 0

    for row in reader:
        if line_count == 0:
            line_count+=1
        if row['date'] != curr_date:
            continue
        if row['vote'] == 'no':
            voteCount -=1
        if row['vote'] == 'yes':
            voteCount +=1
    
    return voteCount, mostAccurateDay(fi, voteCount, curr_date)
     
        

def main():
    totalNoVotes = 0
    totalYesVotes = 0

    timesWatered = 0
    timesNotWatered = 0

    userList = []
    usersAccuracy = [0]*500
    usersVotes = [0]*500
    
    print(glob.glob('/home/pi/oldData/*.csv'))

    allFiles = glob.glob('/home/pi/oldData/*.csv')
    
    print(allFiles)

    for fi in allFiles:
       
        f = open(fi, 'r')
        reader = csv.DictReader(f)

        line_count = 0

        curr_date = ''

        for row in reader:
            if line_count == 0:
                line_count+=1
                curr_date = row['date']
            if curr_date != row['date']:
                yesorno, usersAcc = determine(fi, curr_date)
                if yesorno > 0:
                    timesWatered+=1
                if yesorno <= 0:
                    timesNotWatered+=1
                for people in usersAcc:
                    usersAccuracy[userList.index(people)]+=1
                curr_date = row['date']
            if row['user'] in userList:
                ind = userList.index(row['user'])
            if row['user'] not in userList:
                userList.append(row['user'])
                ind = userList.index(row['user'])
            vote = row['vote']
            if vote == 'no':
                totalNoVotes+=1
                usersVotes[ind]+=1
            if vote == 'yes':
                totalYesVotes+=1
                usersVotes[ind]+=1
    print('calling graph')
    graph(totalNoVotes, totalYesVotes, timesWatered, timesNotWatered, userList, usersAccuracy, usersVotes)

main()
