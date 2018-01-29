# Velib' bycicle live visualisation

This project uses google maps with Heatmap Layers to display :
- live positions of bikes in Paris.
- date range flux of velib in Paris.

### How to use it.

First of all, you need python 3 installed (fetch the last version on python website) & pipenv for the virtualenv/package manager. (`python3 -m pip install pipenv`)

Then you have to :
- `git clone <repo_url> <repo_name> && cd <name>` to get the code source.
- `pipenv install` to get all dependencies.
- `pipenv run python velib_controller.py` to start the flask server.
- Open your web browser (Chrome, Firefox, Opera) and enter `localhost:5000`

### How does it work

In order to display the informations the program uses :
- a flask server.
- SocketIO extension to be able to exchange data with client through WebSocket. (Flux only)
- A connexion to a remote database containing historic data of velib' bikes positions. (Flux only)
- Access to official Velib' bikes API to get real time data.
