from impala.dbapi import connect
from flask_socketio import emit
from datetime import datetime
from json_serializer import json_dumps, json_loads


def sql_chunck_gene(bdd, chunk_size, start, end):
    # create a cursor to execute the request.
    cursor = bdd.cursor(dictify=True)
    cursor.execute("USE road_traffic_data")
    cursor.execute("show tables")
    for elem in cursor:
        print(elem)
    print("Cursor created. Execute query on database.")
    # TODO: remove limit 10000 in query
    req = """SELECT latitude, longitude, available_bikes, date_extract
    FROM velib_data WHERE date_extract > %s AND date_extract < %s
    ORDER BY date_extract LIMIT 10000000"""
    params = (start, end)
    cursor.execute(req, params)
    print("Query on database is executed. Stream of data begins.")

    # gonna fetch a fix number of results and yields them as a stream.
    while True:
        data = cursor.fetchmany(chunk_size)
        if not data:
            break
        yield data

def send_data_to_client(socketio, message):
    # Connect to the impala database when needed.
    bdd = connect(host='167.114.235.165', port=21050)
    print("Database connection is done")

    current_data = []
    for chunck in sql_chunck_gene(bdd, 1000, message['start'], message['end']):
        emit("chunck_sent", json_dumps(chunck))
        socketio.sleep(0.1)
