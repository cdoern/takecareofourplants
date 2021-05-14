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
from math import gcd

import glob

sns.set()

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

    topTen = []

    counter = 0

    tempMax = 0


    # use selection/insetion sort and sort a new array each time you find the max. keep track of the original index in userVotes by adding for loop counter to where you are in sorted array


    for ind, amount in enumerate(userVotes):
        tempMax = 0
        if amount > maxm:
            maxm = amount
            index = ind
        for i in range(ind, len(userVotes)-1):
            if userVotes[i] > tempMax and counter < 5:
                tempMax = userVotes[i]
                topTen.append(i)
                counter+=1
    return index, topTen

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


   
    userVotes, topTen = mostVotes(usersVotes) #returns the index of th euser with the most votes and the indexes of the top 10 voters 

    userVotes = users[userVotes] # gets users name

    topTenPeople = []

    topTenVotes = []


    for indexes in topTen:
        topTenPeople.append(users[indexes]) # populates the top 10 voters names
        topTenVotes.append(usersVotes[indexes]) # populates the top 10 users amount of votes
    print(topTenPeople)
    print(topTenVotes)

    fig, axs = plt.subplots(facecolor='w', nrows=3) # Set Up Figure and Subplots

    #plt.subplots_adjust(top = .8)

    #fig.margins(x=0, y =100)
    
    sns.barplot(x=x1, y=y1, color=sns.color_palette()[0], ax=axs[0]) # Plot Barplots
    sns.barplot(x=x2, y=y2, color=sns.color_palette()[0], ax=axs[1])
    axs[2] = plt.barh(topTenPeople, topTenVotes) # horiz user graph, seaborn doesnt support barh, this causes ALOT of issues...

    

    axs[0].set_ylabel('vote number') # Clean Y Labels
    axs[1].set_ylabel('total times')
    plt.text(18, -3.1, "times voted" ) # barh doesnt add a y label feature or x label so manually inputting text
    #axs[2].set_ylabel('best users')

    max_y = max(y1)+1 # Synchronize Axes
    max_y2 = max(y2)+1
    #max_y3 = max(topTenPeople) + 1
    """ NOT READY YET

    stepy1 = [] # array for y step values

    stepy2 = [] # array for y step values

    maxy1 = max(y1)

    maxy2 = max(y2)

    maxtotal = 0 # max total is so that we ony need one loop
    maxmin = 0

    if maxy1 > maxy2:
        maxtotal = maxy1 
        maxmin = maxy2 -10
    else:
        maxtotal = maxy2
        maxmin = maxy1 - 10

    i = 1
    #div = gcd(maxy1, maxy2) # this is so the .is_integer lines work at least kinda
    #div = ((maxy1 * maxy2)/div)

    while(True):
        if((maxy1 % maxmin == 0) and (maxy2 % maxmin == 0)):
            div = maxmin
            break
        maxmin-=1
    for i in range(1,maxtotal):
        y1frac = ((i  * div)/maxy1).is_integer() # if its a divisor
        y2frac = ((i * div)/maxy2).is_integer() #if it is a divisor 

        if y1frac and i <= maxy1: # add to the array if true
            stepy1.append(i)
        if y2frac and i <= maxy2: # add to the array if true
            stepy2.append(i)

    axs[0].set_yticks(stepy1) # sets y step for g1
    axs[1].set_yticks(stepy2) # sets y step for g2

    NOT READY YET""" 

    axs[0].set_ylim(0,max_y)
    axs[1].set_ylim(0,max_y2)
   # axs[2].ylim(0, max_y3)

    plt.tight_layout() # Clean Suptitle
    fig.suptitle('Cumulative Voting Data', y=1.01)

    userAcc = users[mostAccurate(usersAccuracy)] # calculates more accurate voter



    axs[0].text(-.22, max(y1)+65, "The user with the most accurate votes was: u/"+userAcc, fontsize = 10)

    axs[0].text(-.22, max(y1)+45, "The user with the most votes was: u/"+userVotes, fontsize = 10)

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
