import requests
import time

AMOUNT_CORDS = 160

url="http://localhost:9090/api/v1/pos"

userid = "bb371c0c-c705-40b3-8a07-795b2a62d9a5"
lat = 50.4
lng = 8.4

print("---------- SCRIPT STARTED ----------")

print("Enter a user-ID: ")
userid = input()

print("Enter starting lat: ")
lat = float(input())

print("Enter starting lng: ")
lng = float(input())

print("There are gonna be send 160 GPS-Coordinates!", "Do you want to enter a new amount? Y/N")
if input() == "Y":
    print("Enter new amount: ")
    AMOUNT_CORDS = int(input())

for i in range(10, -1, -1):
    time.sleep(1)
    print("Sending data in: {}\n".format(i))

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

    print(response.text) #TEXT/HTML
    print(response.status_code, response.reason, "\n")

    time.sleep(0.4)

print("---------- SCRIPT ENDED ----------")
