import RPi.GPIO as GPIO
import datetime
import time


GPIO.setmode(GPIO.BOARD)


def get_status(pin = 8): # soil moisture data
    GPIO.setup(pin, GPIO.IN) 
    return GPIO.input(pin)


def init_output(): # relay init
    GPIO.setup(7, GPIO.OUT)
    GPIO.output(7, GPIO.LOW)
    GPIO.output(7, GPIO.HIGH)
    

def water(): # plant watering
    GPIO.output(7, GPIO.LOW)
    time.sleep(6)
    GPIO.output(7, GPIO.HIGH)
    
def main():
    init_output()
    f = open("/home/pi/Documents/des.txt", "r")
    des = f.readLine()
    desInt = int(des)
    f.close()
    if desInt == 1:
        water()
    soilm = get_status()
    f = open("/home/pi/Documents/soilm.txt", "w")
    f.write(str(soilm))
    f.close()

main()

