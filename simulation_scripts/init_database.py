import requests
import json
import urllib3
import os
from imports import console

(consoleWidth, consoleHeight) = console.getTerminalSize()

seperator = "-" * (consoleWidth - 2) + "\n"
headerSeperatorHalf = "-" * int(((consoleWidth - 19) / 2))
print(console.colors.PINK, seperator, headerSeperatorHalf, " SCRIPT STARTED ", headerSeperatorHalf + "\n", seperator, console.colors.ENDC)

baseURL = "http://localhost:9090/api/v1"
userURL = baseURL + "/user"
posURL = baseURL + "/pos"
zoneURL = baseURL + "/zone"

usersString = r"""[
    {"userid": "noID", "username": "TEST_MARKER", "password": "testmarker", "lat": 50.6, "lng": 8.7, "zoneid": "1"},
    {"userid": "noID", "username": "TEST_ROUTE", "password": "testroute", "lat": 50.45, "lng": 8.4, "zoneid": "1"},
    {"userid": "noID", "username": "USER_1", "password": "user1", "lat": 50.2, "lng": 8.4, "zoneid": "1"},
    {"userid": "noID", "username": "USER_2", "password": "user2", "lat": 50.7, "lng": 8.3, "zoneid": "1"},
    {"userid": "noID", "username": "USER_3", "password": "user3", "lat": 50.25, "lng": 8.25, "zoneid": "1"}
]
"""

users = json.loads(usersString)
createUser = json.loads(usersString)

print("Initiating Zones...")

res = requests.post(zoneURL, json = {
    'name': "Gießen",
    'radius': 10000,
    'pos': [
        {
          'lat': 50.58727,
          'lng': 8.67554
        }
      ]
    })
if res.status_code == 201:
    zoneid = res.text.replace("\"", "")
    users[0]['zoneid'] = zoneid
    createUser[0]['zoneid'] = zoneid
    print(console.colors.GREEN, "Successfully Initiated Zone\n", console.colors.ENDC)
else:
    print(console.colors.RED, "Successfully Initiated Zone\n", console.colors.ENDC)

for user in createUser:
    user.pop('userid', None)
    user.pop('lat', None)
    user.pop('lng', None)

try:
    ids_file = open("dataFiles/ids.txt", "w+")
except FileNotFoundError:
    os.mkdir('dataFiles')
    ids_file = open("dataFiles/ids.txt", "w+")

isInitiated = True

print("Initiating Users...")

try:
    for i in range(5):
        res = requests.post(userURL, json = users[i])
        if res.status_code == 201:
            id = res.text.replace("\"", "")
            users[i]['userid'] = id
        else:
            isInitiated = False

    if isInitiated == True:
        print(console.colors.GREEN, "Successfully Initiated Users\n", console.colors.ENDC)
    else:
        print(console.colors.RED, "Failed Initiating Users\n", console.colors.ENDC)

    setCords = users

    for user in setCords:
        user.pop('username', None)
        user.pop('password', None)

    isInitiated = True

    print("Initiating GPS-Coordinates of those Users...")

    for i in range(5):
        res = requests.post(posURL, json = setCords[i])
        if res.status_code != 201:
            isInitiated = False

    if isInitiated == True:
        print(console.colors.GREEN, "Successfully GPS-Coordinates of those Users\n", console.colors.ENDC)
    else:
        print(console.colors.RED, "Failed Initiating GPS-Coordinates of those Users\n", console.colors.ENDC)

    ids_file.write(str(users))
    ids_file.close()

except (ConnectionRefusedError, urllib3.exceptions.NewConnectionError, urllib3.exceptions.MaxRetryError, requests.exceptions.ConnectionError):
    print(console.colors.RED, "Couldn't connect to the Server!\n", console.colors.ENDC)

print(console.colors.PINK, seperator, headerSeperatorHalf, " SCRIPT STOPPED ", headerSeperatorHalf + "\n", seperator, console.colors.ENDC)
