# takecareofourplants

This is the take care of our plants project, an online an offline initiative to make automated/smart gardening much more accessible. 

# Reddit Component 

Index.js is the file for the first iteration of the project which lasted from February 2018 - May 2019. This file is a verbatim copy and paste. Copy this code into a local JS file, install the proper libraries, and input the proper keys for the reddit API and pubnub. What this does is it takes input from an arduino and raspberry pi, and takes users votes, based on this data, whether or not the plant(s) should be watered. This is the stepping stone for the more generally applicable, downloadable client based off of this project. 

the following files are allocated to the Reddit aspect of this project:
1) Index.js 
2) humid.js

# Downloadable Content/Garden Monitor

The next aspect of this project and the currently maintained one, is the Take Care of Our Plants Garden Monitoring System. This is currently in early beta stages, but a usable client (TakeCareOfOurPlants.exe) is posted above for download!!! 

This system is written in Java with a small JS component which manages the reading of the data from your garden. I have set this up so that, following the detailed guide below, anyone can monitor their garden from anywhere in the entire world. 

[Click here to download it or get it above](TakeCareOfOurPlants.exe/download)

## Parts

1) [Raspberry Pi 3b](https://www.amazon.com/Raspberry-Pi-RASPBERRYPI3-MODB-1GB-Model-Motherboard/dp/B01N13X8V1/ref=sr_1_1_sspa?keywords=raspberry%2Bpi%2B3b&qid=1557795341&s=gateway&sr=8-1-spons&th=1)
2) [Raspbian OS on a micro SD](https://www.amazon.com/LoveRPi-Raspbian-MicroSD-Raspberry-8GB/dp/B017JKJEAU/ref=sr_1_1_sspa?keywords=micro+sd+card+8gb&qid=1557795387&s=gateway&sr=8-1-spons&psc=1)
3) [Arduino UNO microcontroller](https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6/ref=sr_1_3?keywords=arduino+uno&qid=1557795434&s=gateway&sr=8-3)
4) [Soil Moisture Sensors x2](https://www.amazon.com/DFROBOT-Gravity-Capacitive-Corrosion-Resistant/dp/B01GHY0N4K/ref=sxts_sxwds-bia?keywords=dfrobot+soil+moisture&pd_rd_i=B01GHY0N4K&pd_rd_r=b0176d9b-4998-4f0d-8a48-b9b9501ad932&pd_rd_w=o8ZmZ&pd_rd_wg=aZlw2&pf_rd_p=f0479f98-a32d-45cd-9c12-7aaced42b1ec&pf_rd_r=KVE41CMEZ3ZXZ25PY2EK&qid=1557795487&s=gateway) 
5) [Humidity/Temp Sensors](https://www.amazon.com/HiLetgo-Temperature-Humidity-Arduino-Raspberry/dp/B01DKC2GQ0/ref=sr_1_3?keywords=dht11&qid=1557795511&s=gateway&sr=8-3)
6) [Jumper Cables](https://www.amazon.com/Elegoo-EL-CP-004-Multicolored-Breadboard-arduino/dp/B01EV70C78/ref=sr_1_1_sspa?keywords=arduino+cable&qid=1557795532&s=gateway&sr=8-1-spons&psc=1)
7) [Arduino Power Cable](https://www.amazon.com/AmazonBasics-USB-2-0-Cable-Male/dp/B00NH11KIK/ref=sr_1_3?keywords=arduino+cable&qid=1557795549&s=gateway&sr=8-3)
8) [Raspberry Pi power supply](https://www.amazon.com/CanaKit-Raspberry-Supply-Adapter-Listed/dp/B00MARDJZ4/ref=sr_1_4?keywords=raspberry+pi+power+cable&qid=1557795598&s=gateway&sr=8-4)

## Steps 

  1. Download the following pieces of code -- TakeCareOfOurPlants.exe, write.jar, sensors.js, and send.js. 
  2. First we are going to set up the executable program as this is the easiest. Just move it onto your desktop and double click on it. That program will inform you if you need to install any other packages in order to run it (java)
  3. the remaining 3 files are all to go on your raspberry pi. write.jar is a client to write your pubnub keys to a text file, sensors.js is the code which takes the arduino sensor data and writes it to text files, send.js sends this data to the pubnub servers which act as our in between service. 
  4. go to https://www.pubnub.com/ and make an account with them. Once you go through all of the steps and log in, it should bring you to a dashboard. Here you are going to click "create new keyset" create 3 new keysets, name them respectively "soil1", "soil2" "humid".
  5. clicking into these keysets will show you your subscribe and publish keys. these are very important. 
  6. Boot up your raspberry pi by inserting the micro SD card as well as plugging in the power cable. YOU WILL NEED A MOUSE AND KEYBOARD!!!!!
  7. configure the pi, set up your wifi network and then in raspberry pi configuration, turn on VNC. this will allow you to access the pi wirelessly from another computer
  8. once you have created a vnc account and signed into that on both the pi and the VNC connect app on your computer, connect to the pi from your laptop, it is much easier.
  9. ok now here comes the most technical part of all of this. open the terminal on the raspberry pi and type, `node -v` if that number is around 4,5 or 6, (or even higher!) we are ok. Then type `npm -v` if that number is around the same range we are also ok. if neither or either of these did not work as described we are going to go ahead and reinstall one, or both. 
  10. to do this, we are going to type in the terminal `sudo apt-get purge -y nodejs npm` this removes all nodejs and npm files if there are any and allows us to do a fresh install
  11. after types YES or Y through all of the commands, we should have rid ourselves of old Node JS! Now to do a quick reinstall of the new stuff we type `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -` then type `sudo apt install -y nodejs`
  12. after doing this, type the same commands `node -v` and `npm -v` and they should be working perfectly! if NPM by any chance does not show up, type `sudo apt-get install npm`
  13. Now, open the file system on your pi and create a new folder somewhere randomly within \home\pi. Call this folder whatever you like, within it you can create 3 new files, naming them respectively what the 3 remaining files you downloaded were. you can download "Filezilla" to transfer the files but honestly just copy and paste their contents into the files you just created in the folder. 
  14. You can choose to use write.js **at your own risk**, this file is finicky on the pi and it is genuinely easier to, once in your newly created folder, click file, create empty file, and then name it "list.txt" within this file you can add on each line 1) the pubnub channel name, **SPACE** 2) the pubnub subscribe key, **SPACE** 3) the pubnub publish key this will allow the file send.js to easily send the data to the proper places. IF you can get Java working on the pi and that process is too complicated for you, use write.java. 
  15. now once the files have been sorted out, go to the terminal on the pi again, type `cd YOUR_FOLDER_NAME` then type `sudo npm install -g pm2`
  16. after setting up our files, before we can run them and read/send data, we need to set up the hardware components which will manage/send our data. 
  17. open up your arduino, plug it in to your PC with the power cable you purchased. go to [the Arduino Website to download the IDE](https://www.arduino.cc/en/Main/Software) and scroll down, and download. 
  18. after opening that up go to **Tools**,**Board** and the choose **Arduino/Genuino Uno** after doing this go down on that same list and click **ports** click the "COM" port with the arduino name next to it. 
  19. We are then going to load a script onto the arduino so we can read it directly from the raspberry pi! 
  20. go to **File**, **Examples**, **Examples for any Board**, **Firmata**, **Standard Firmata** This is a script which allows the arduino to be accessed by external sources/libraries. Once this is opened, click the rightward arrow in the top left that says **Upload** when you hover over it. This should successfully upload the script to your arduino. 
  21. Now we are going to wire up the Arduino pins with the soil moisture sensors. Pull out your two soil moisture sensors and plug the wires that they come with into the sensor itself properly. the **BLACK** wire gets plugged into the **GND** or Ground port of the arduino, the **RED** wire gets plugged into the **3.3V** port of the **5V** port, either one. and the **BLUE** wire gets plugged into port **A0** for one sensor and **A2** for the other. these are the ports that read the data. plug them in **EXACTLY AS INSTRUCTED**
  22. Pull Out your humidity sensors, open one up and plug the **+** port into the **BOTTOM LEFT** port of the Raspberry pi. when talking about directions bottom left is the leftpost GPIO pin on the opposite side of the board from the USB ports. This is also called **PIN 2** the **-** port gets plugged into **PIN 6** or the third pin up from the bottom left. The last pin which is the out pin gets plugged into **PIN 29/GPIO5** or the 6th pin from the top right. 
  23. In the raspberry pi terminal cd into your folder if not already and then type `npm install` this command is __Supposed to__ install all proper libraries but rarely ever does so after typing this just to be sure type, `npm install johnny-five` , `npm install system-sleep`, `npm install pigpio-dht`
  24. after setting up the hardware and installing PM2, and other libraries. type `sudo pm2 start sensors.js --name sensorbot` and then `sudo pm2 start send.js --name sendbot` in the raspberry pi terminal. 
  25. you can check on these bots by typing `sudo pm2 log` and stop them if they are throwing errors by typing `sudo pm2 stop BOT_NAME`.
  26. you are now all set up!!!! open up the desktop application (TakeCareOfOurPlants.exe) enter your credentials and you're ready to go!!!
