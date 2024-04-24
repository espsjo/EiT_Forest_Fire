from network import LTE
import time
import socket
import pycom
# from network import WLAN
# import machine
# import ntp
from machine import Pin
from dth import DTH


# ntp()

lte = LTE()
#some carriers have special requirements, check print(lte.send_at_cmd("AT+SQNCTM=?")) to see if your carrier is listed.
#when using verizon, use
#lte.init(carrier="asdf")
#when usint AT&T use,
#lte.init(carrier=at&t)
print(lte.send_at_cmd("AT+SQNCTM=?"))

#some carriers do not require an APN
#also, check the band settings with your carrier
print("Startup...")
lte.attach(band=20, apn="mda.lab5e")
print("attaching..",end='')
while not lte.isattached():
    time.sleep(0.25)

    print('.',end='')
    print(lte.send_at_cmd('AT!="fsm"'))         # get the System FSM
print("attached!")

lte.connect()
print("connecting [##",end='')
while not lte.isconnected():
    time.sleep(0.30)
    print('#',end='')
    #print(lte.send_at_cmd('AT!="showphy"'))
    print(lte.send_at_cmd('AT!="fsm"'))
print("] connected!")

#print(socket.getaddrinfo('pybytes.pycom.io', 80))  

pycom.heartbeat(False)

UDPClientSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
th = DTH(Pin('P23', mode=Pin.OPEN_DRAIN), 0)

while(True):
    print("Taking measurements")
    pycom.rgbled(0x000008) # blue
    result = th.read()
    time.sleep(1)
    result = th.read()
    if result.is_valid():
        pycom.rgbled(0x001000) # green
        print("Temperature: %d C" % result.temperature)
        print("Humidity: %d %%" % result.humidity)
        #Send UDP packet to span ------------------------
        msg_to_send = str(result.temperature) + "," + str(result.humidity)
        bytes_to_send = str.encode(msg_to_send)
        server_address_and_port = ("172.16.15.14", 1234)

        print("Sending measurements")
        UDPClientSocket.sendto(bytes_to_send, server_address_and_port)
        #End UDP stuff ----------------------------------

        #lte.deinit()

        print("Sent data")
        
        pycom.rgbled(0x000000) #off
        time.sleep(5)
    