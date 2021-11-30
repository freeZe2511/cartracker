import requests
import time
import json
import console

AMOUNT_CORDS = 160

url="http://localhost:9090/api/v1/pos"

(consoleWidth, consoleHeight) = console.getTerminalSize()

seperator = "-" * (consoleWidth - 1) + "\n"
headerSeperatorHalf = "-" * int(((consoleWidth - 18) / 2))
print(console.colors.PINK, seperator, headerSeperatorHalf, " SCRIPT STARTED ", headerSeperatorHalf, seperator, console.colors.ENDC)

print("Running in default mode!", "Do you want to enter new data? [Y/N]")
if input() == "Y":
    print("Enter a user-ID: ")
    userid = input()
    print("Enter starting lat: ")
    lat = float(input())
    print("Enter starting lng: ")
    lng = float(input())
    print("Enter new amount: ")
    AMOUNT_CORDS = int(input())
else:
    idsFile = open("ids.txt", "r")
    idsFileContent = idsFile.read().replace("'", "\"")
    user = json.loads(idsFileContent)[0]
    userid = user['userid']
    lat = user['lat']
    lng = user['lng']

print("")

for i in range(5, -1, -1):
    time.sleep(1)
    print(console.colors.WARNING + "Sending data in: {}\n".format(i) + console.colors.ENDC)

for i in range(0, AMOUNT_CORDS):
    mod = i % 80

    if mod < 10:
        lat -= 0.01
        lng -= 0.01
    elif mod < 30:
        lng -= 0.01
    elif mod < 40:
        lat += 0.015
    elif mod < 60:
        lat -= 0.010
        lng += 0.02
    elif mod < 70:
        lat += 0.015
    elif mod < 75:
        lat += 0.005
        lng -= 0.03
    else:
        lat -= 0.005
        lng -= 0.02


    payload = {'userid': userid, 'lat': lat, 'lng': lng}
    response = requests.post(url, json = payload)

    if response.status_code == 201:
        print(console.colors.GREEN)
    else:
        print(console.colors.RED)

    print("Coordinate {}:\t".format(i+1), response.status_code, response.reason, "\n" + console.colors.ENDC)

    time.sleep(0.4)

print(console.colors.PINK, seperator, headerSeperatorHalf, " SCRIPT STOPPED ", headerSeperatorHalf, seperator, console.colors.ENDC)
