# MQTT CLIENT
from distutils.command.config import config
from email.mime import base
import paho.mqtt.client as mqtt
import time
import sys
import yaml

with open('mqtt_config.yaml') as file:
    configMQTTFile = yaml.safe_load(file)

host = configMQTTFile["host"]
port = configMQTTFile["port"]
# clean_session = True
# client_id     = "PCSergio2"
user_name = configMQTTFile["user_name"]
password = configMQTTFile["password"]

temperatureR1 = "22"
temperatureR2 = "22"
temperatureR3 = "22"

def on_connect (client, userdata, flags, rc):
    """ Callback called when connection/reconnection is detected """
    print ("Connect %s result is: %s" % (host, rc))
    
    # With Paho, always subscribe at on_connect (if you want to
    # subscribe) to ensure you resubscribe if connection is
    # lost.
    client.subscribe("server/room1")
    client.subscribe("server/room2")
    client.subscribe("server/room3")

    if rc == 0:
        client.connected_flag = True
        print ("connected OK")
        return
    
    print ("Failed to connect to %s, error was, rc=%s" % rc)
    # handle error here
    sys.exit(-1)

def on_message(client, userdata, msg):
    """ Callback called for every PUBLISH received """
    print ("%s => %s" % (msg.topic, str(msg.payload)))
    if(msg.topic=="server/room1"):
        global temperatureR1
        temperatureR1 = str(msg.payload.decode("utf-8"))
        print(temperatureR1)
    elif(msg.topic=="server/room2"):
        global temperatureR2
        temperatureR2 = str(msg.payload.decode("utf-8"))
        print(temperatureR2)
    elif(msg.topic=="server/room3"):
        global temperatureR3
        temperatureR3 = str(msg.payload.decode("utf-8"))
        print(temperatureR3)
        

class MQTTClient():

    def __init__(self, client_id, clean_session):
        # Define clientId, host, user and password
        self.client = mqtt.Client(client_id = client_id, clean_session = clean_session)
        # self.client.username_pw_set(user_name, password)

        self.client.on_connect = on_connect
        self.client.on_message = on_message

        # connect using standard unsecure MQTT with keepalive to 60
        self.client.connect (host, port, keepalive = 60)
        self.client.connected_flag = False
        while not self.client.connected_flag:           #wait in loop
            self.client.loop()
            time.sleep (1)
        self.client.loop_start()


    def sendMssg(self, topic, message):
        ret = self.client.publish(topic, message)
        self.client.loop()

        print ("Publish operation finished with ret=%s" % ret)

    def updateTemperatures(self):
        return temperatureR1, temperatureR2, temperatureR3