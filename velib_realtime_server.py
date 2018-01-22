from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import eventlet
import requests
eventlet.monkey_patch()


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Main page of the web service.
@app.route('/')
def index():
    return render_template('velib_view.html')


def fetch_data():
    endpoint = "https://www.velib-metropole.fr/webapi/map/details"
    params = {
        "gpsTopLatitude" : 49.00094298321503,
        "gpsTopLongitude" : 2.7699279785156254,
        "gpsBotLatitude" : 48.75256718365392,
        "gpsBotLongitude" : 1.8848419189453125,
        "zoomLevel" : 11
    }
    req = requests.get(endpoint, params=params)
    if req.status_code == 200:
        return req.text
    return None

def background_thread():
    # TODO:
    # fetch data from api
    data = fetch_data()
    # emit data to client
    socketio.emit('realtime_data', data)

# perform task, then when 1 minute as long as server us running.
def listen():
    while True:
        background_thread()
        eventlet.sleep(10)

eventlet.spawn(listen)


# @socketio.on('load_data')
# def feed_data(message):
#     print("streaming & processing database")
#     velib_model.send_data_to_client(message)
#     print("streaming over")



if __name__ == '__main__':
    print("Hello World")
    socketio.run(app, host='0.0.0.0', debug=1, threaded=True)
