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

base_topic = configMQTTFile["base_topic"]

def on_connect (client, userdata, flags, rc):
    """ Callback called when connection/reconnection is detected """
    print ("Connect %s result is: %s" % (host, rc))
    
    # With Paho, always subscribe at on_connect (if you want to
    # subscribe) to ensure you resubscribe if connection is
    # lost.
    # client.subscribe("some/topic")

    if rc == 0:
        client.connected_flag = True
        print ("connected OK")
        return
    
    print ("Failed to connect to %s, error was, rc=%s" % rc)
    # handle error here
    sys.exit(-1)


def on_message(client, userdata, msg):
    """ Callback called for every PUBLISH received """
    print ("%s => %s" % (msg.topi, str(msg.payload)))

class MQTTClient():

    def __init__(self, client_id, clean_session):
        # Define clientId, host, user and password
        self.client = mqtt.Client(client_id = client_id, clean_session = clean_session)
        self.client.username_pw_set(user_name, password)

        self.client.on_connect = on_connect
        self.client.on_message = on_message

        # connect using standard unsecure MQTT with keepalive to 60
        self.client.connect (host, port, keepalive = 60)
        self.client.connected_flag = False
        while not self.client.connected_flag:           #wait in loop
            self.client.loop()
            time.sleep (1)

    def sendMssg(self, subtopic, message):
        topic = base_topic + subtopic
        ret = self.client.publish(topic, message)
        self.client.loop()

        print ("Publish operation finished with ret=%s" % ret)