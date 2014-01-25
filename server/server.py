from flask import Flask
from flask_sockets import Sockets
from TwitterAPI import TwitterAPI
ckey = 'wIdppGIxa9aT4DR4qIvchw'
csecret = '5WyxTZZoEZt21xys7TE2fTK0ym2tkUR4BR46pwGO8'
atoken = '2284408861-gWLyd9FvIJImE7t713zbr5xRc8g3ST9PnM23gNg'
asecret = 'y64QDnuUA16HgsCzOpw03oHA86gyOA3YykWRuKlmACuJu'

app = Flask(__name__)
sockets = Sockets(app)

@sockets.route('/websocket')
def echo_socket(ws):
    api = TwitterAPI(ckey, csecret, atoken, asecret)
    r = api.request('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8'})
    message = ws.receive()
    for item in r.get_iterator():
        ws.send(item['text'])

@app.route('/')
def hello():
    return 'Hello World!'