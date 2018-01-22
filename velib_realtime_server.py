from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import eventlet
eventlet.monkey_patch()


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Main page of the web service.
@app.route('/')
def index():
    return render_template('velib_view.html')


def background_thread():
    # TODO:
    # fetch data from api
    # store it on DB
    # emit data to client
    socketio.emit('realtime_data', dict(foo='bar'))

# perform task, then when 1 minute as long as server us running.
def listen():
    while True:
        background_thread()
        eventlet.sleep(5)

eventlet.spawn(listen)


# @socketio.on('load_data')
# def feed_data(message):
#     print("streaming & processing database")
#     velib_model.send_data_to_client(message)
#     print("streaming over")



if __name__ == '__main__':
    print("Hello World")
    socketio.run(app, host='0.0.0.0', debug=1)
