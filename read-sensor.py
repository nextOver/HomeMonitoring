
#!/usr/bin/python3
__author__ = "Jonadabe Serra"
__license__ = "GPL"

import requests
import time
import os
from random import randint
import json

#distance = "300"
privatekey = "kS2W2~aZ68>5=rt!"
url = "http://localhost/MyProject/api.php"
x = 0

print("[?] Starting Service")
print("[!] Service Running")

def sendData_to_Server(url,dist,status):
	userdata = {"distance": dist, "passcode": privatekey, "servicestate": status}
	res = requests.get(url, params=userdata)
	#print(status)

while x < 2:
	distance = randint(0, 2000)
	memtotal = os.popen("free -h | tr -s ' ' | sed '/^Mem/!d' | cut -d' ' -f2")
	memusage = os.popen("free -h | tr -s ' ' | sed '/^Mem/!d' | cut -d' ' -f3")
	timeupdate = time.strftime('%H:%M %d/%m/%Y')
	uptime = os.popen("uptime -p | sed 's/^up*//g'")
	servicestate = json.dumps({'mem_total':str.rstrip(memtotal.read()), 'mem_usage':str.rstrip(memusage.read()),'last_update': timeupdate, "uptime":str.rstrip(uptime.read())}) 
	sendData_to_Server(url,distance,servicestate)
	time.sleep(10)


'''except KeyboardInterrupt:
    print("Finalizando...")
    '''