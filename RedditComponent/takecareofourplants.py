import RPi.GPIO as GPIO
import datetime
import time
import sys
import Adafruit_DHT
from MCP3008 import MCP3008


GPIO.setmode(GPIO.BOARD)

adc = MCP3008()

def get_status(): # soil moisture data
    value = adc.read( channel = 0 ) # You can of course adapt the channel to be read out
    #value = round((value / 880.0) * 100)
    value = round((((value - 700) / (880 - 700)) * (100 - 0)))
    return value

def get_th():
    humidity, temperature = Adafruit_DHT.read_retry(11, 17)
    temperatureStr = str(int(temperature) * (9/5) + 32)
    humidStr = str(humidity)
    return temperatureStr, humidStr

def init_output(): # relay init
    GPIO.setup(7, GPIO.OUT)
    GPIO.output(7, GPIO.LOW)
    GPIO.output(7, GPIO.HIGH)
    

def water(): # plant watering
    GPIO.output(7, GPIO.LOW)
    time.sleep(10)
    GPIO.output(7, GPIO.HIGH)
    
def main():
    init_output()
    f = open("/home/pi/Documents/des.txt", "r")
    des = f.readline()
    desInt = int(des)
    f.close()
    if desInt == 1:
        water()
    soilm = get_status()
    temp, humid = get_th()
    f = open("/home/pi/Documents/soilm.txt", "w")
    f.write(str(soilm))
    f.close()
    
    f = open("/home/pi/Documents/temp.txt", "w")
    f.write(str(temp))
    f.close()
    
    f = open("/home/pi/Documents/humid.txt", "w")
    f.write(str(humid))
    f.close()
    

main()
