# FLASK SERVER
from flask import Flask, request
from flask_cors import CORS, cross_origin

from datetime import datetime
import time
import json
import os

# import mqtt_client

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# mqttclient = mqtt_client.MQTTClient("FlaskServer", clean_session=True)

# mqttclient2 = mqtt_client.MQTTClient("FlaskServer2", clean_session=True)

# Load DB from file
if(os.path.exists('db.json')):
    if os.stat('db.json').st_size != 0:
        with open('db.json') as json_file:
            JSONdb = json.load(json_file)
    else:
        JSONdb = {
            'bookings': []
        }
else:
    JSONdb = {
        'bookings': []
    }

# Members API route
@app.route("/rooms", methods=["GET"])
def available_rooms():
    startString = request.args.get('startDate')
    endString = request.args.get('endDate')
    startDate = startString.replace('"', '')
    endDate = endString.replace('"', '')
    JSONStartDate, JSONEndDate = transformDate(startDate, endDate)

    room1Flag = False
    room2Flag = False
    room3Flag = False
    for book in JSONdb['bookings']:
        dbRoom = book['room']
        dbSD = book['startDate']
        dbED = book['endDate']
        JSONdbDateStart = datetime(int(dbSD['year']), int(dbSD['month']), int(dbSD['day']), int(dbSD['hour']), int(dbSD['minute']))
        JSONdbDateEnd = datetime(int(dbED['year']), int(dbED['month']), int(dbED['day']), int(dbED['hour']), int(dbED['minute']))
        if(JSONdbDateStart<JSONStartDate<JSONdbDateEnd):
            None

    return {"room1": "booked", "room2": "available", "room3": "booked"}

@app.route("/add", methods=["POST"], strict_slashes=False)
@cross_origin() # allow all origins all methods.
def add_articles():

    startDate = request.json['startDate']
    endDate = request.json['endDate']
    room = request.json['room']

    # print(startDate)
    # print(endDate)
    # print(room)

    JSONStartDate, JSONEndDate = transformDate(startDate, endDate)

    JSONitem = {
        'startDate': {
            'year': JSONStartDate.year,
            'month': JSONStartDate.month,
            'day': JSONStartDate.day,
            'hour': JSONStartDate.hour,
            'minute': JSONStartDate.minute
        },
        'endDate': {
            'year': JSONEndDate.year,
            'month': JSONEndDate.month,
            'day': JSONEndDate.day,
            'hour': JSONEndDate.hour,
            'minute': JSONEndDate.minute
        },
        'room': room
    }

    saved = False
    for bookinglistnum in range(len(JSONdb["bookings"])):
        startDateItem = JSONdb["bookings"][bookinglistnum]["startDate"]
        JSONdbDate = datetime(int(startDateItem['year']), int(startDateItem['month']), int(startDateItem['day']), int(startDateItem['hour']), int(startDateItem['minute']))
        if (JSONStartDate<JSONdbDate):  
            JSONdb["bookings"].insert(bookinglistnum, JSONitem)
            saved = True
            break 

    if not saved: JSONdb["bookings"].append(JSONitem)
                       
    with open('db.json', 'w') as outfile:
        json.dump(JSONdb, outfile)  

    # if(mssg!=''):
    #     mqttclient.sendMssg("/input", mssg)
        # mqttclient2.sendMssg("/input", "Message from 2nd client")

    return "OK"

def transformDate(startString, endString):
    startYear = startString.split('T')[0].split('-')[0]
    startMonth = startString.split('T')[0].split('-')[1]
    startDay = startString.split('T')[0].split('-')[2]
    startHour = str(int(startString.split('T')[1].split(':', 2)[0])+2)
    startMinute = startString.split('T')[1].split(':', 2)[1]
    endYear = endString.split('T')[0].split('-')[0]
    endMonth = endString.split('T')[0].split('-')[1]
    endDay = endString.split('T')[0].split('-')[2]
    endHour = str(int(endString.split('T')[1].split(':', 2)[0])+2)
    endMinute = endString.split('T')[1].split(':', 2)[1]

    # print(datetime.now())
    JSONStartDate = datetime(int(startYear), int(startMonth), int(startDay), int(startHour), int(startMinute))
    JSONEndDate = datetime(int(endYear), int(endMonth), int(endDay), int(endHour), int(endMinute))

    return JSONStartDate, JSONEndDate

if __name__ == "__main__":
    app.run(debug=True)