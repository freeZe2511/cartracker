import requests
import json
import console

(consoleWidth, consoleHeight) = console.getTerminalSize()

seperator = "-" * (consoleWidth - 1) + "\n"
headerSeperatorHalf = "-" * int(((consoleWidth - 18) / 2))
print(console.colors.PINK, seperator, headerSeperatorHalf, " SCRIPT STARTED ", headerSeperatorHalf, seperator, console.colors.ENDC)

baseURL = "http://localhost:9090/api/v1"
userURL = baseURL + "/user"
posURL = baseURL + "/pos"

usersString = r"""[
    {"userid": "noID", "username": "TEST_MARKER", "password": "testmarker", "lat": 50.7, "lng": 8.3},
    {"userid": "noID", "username": "TEST_ROUTE", "password": "testroute", "lat": 50.45, "lng": 8.4},
    {"userid": "noID", "username": "USER_1", "password": "user1", "lat": 50.2, "lng": 8.4},
    {"userid": "noID", "username": "USER_2", "password": "user2", "lat": 50.6, "lng": 8.7},
    {"userid": "noID", "username": "USER_3", "password": "user3", "lat": 50.25, "lng": 8.25}
]
"""

users = json.loads(usersString)
createUser = json.loads(usersString)

for user in createUser:
    user.pop('userid', None)
    user.pop('lat', None)
    user.pop('lng', None)

ids_file = open("ids.txt", "w")

isInitiated = True

print("Initiating Users...")

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

print(console.colors.PINK, seperator, headerSeperatorHalf, " SCRIPT STOPPED ", headerSeperatorHalf, seperator, console.colors.ENDC)
