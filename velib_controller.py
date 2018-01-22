from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import velib_model


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    print("user connected")
    return render_template('velib_view.html')

@socketio.on('load_data')
def feed_data(message):
    print("streaming & processing database")
    velib_model.send_data_to_client(message)
    print("streaming over")



if __name__ == '__main__':
    print("Hello World")
    socketio.run(app, host= '0.0.0.0')
