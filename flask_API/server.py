# FLASK SERVER
from flask import Flask, request
from flask_cors import CORS, cross_origin

from datetime import datetime
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
@app.route("/rooms")
def members():
    return {"room1": "available", "room2": "available", "room3": "booked"}

@app.route("/add", methods=["POST"], strict_slashes=False)
@cross_origin() # allow all origins all methods.
def add_articles():

    startDate = request.json['startDate']
    endDate = request.json['endDate']
    room = request.json['room']

    # print(startDate)
    # print(endDate)
    # print(room)

    startYear = startDate.split('T')[0].split('-')[0]
    startMonth = startDate.split('T')[0].split('-')[1]
    startDay = startDate.split('T')[0].split('-')[2]
    startHour = str(int(startDate.split('T')[1].split(':', 2)[0])+2)
    startMinute = startDate.split('T')[1].split(':', 2)[1]
    endYear = endDate.split('T')[0].split('-')[0]
    endMonth = endDate.split('T')[0].split('-')[1]
    endDay = endDate.split('T')[0].split('-')[2]
    endHour = str(int(endDate.split('T')[1].split(':', 2)[0])+2)
    endMinute = endDate.split('T')[1].split(':', 2)[1]

    JSONitem = {
        'startDate': {
            'year': startYear,
            'month': startMonth,
            'day': startDay,
            'hour': startHour,
            'minute': startMinute
        },
        'endDate': {
            'year': endYear,
            'month': endMonth,
            'day': endDay,
            'hour': endHour,
            'minute': endMinute
        },
        'room': room
    }

    # print(datetime.now())

    JSONitemDate = datetime(int(startYear), int(startMonth), int(startDay), int(startHour), int(startMinute))

    saved = False
    for bookinglistnum in range(len(JSONdb["bookings"])):
        startDateItem = JSONdb["bookings"][bookinglistnum]["startDate"]
        JSONdbDate = datetime(int(startDateItem['year']), int(startDateItem['month']), int(startDateItem['day']), int(startDateItem['hour']), int(startDateItem['minute']))
        if (JSONitemDate<JSONdbDate):  
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

if __name__ == "__main__":
    app.run(debug=True)