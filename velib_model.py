import pymysql
from flask_socketio import emit
from datetime import datetime
from json_serializer import json_dumps, json_loads


def sql_chunck_gene(bdd, chunk_size, start, end):
    # create a cursor to execute the request.
    with bdd.cursor() as cursor:
        print("Cursor created. Execute query on database.")
        # TODO: remove limit 10000 in query
        req = """SELECT latitude, longitude, available_bikes, date_extract
        FROM velib WHERE date_extract > %s AND date_extract < %s LIMIT 100000"""
        params = (start, end)
        cursor.execute(req, params)
        print("Query on database is executed. Stream of data begins.")

        # gonna fetch a fix number of results and yields them as a stream.
        while True:
            data = cursor.fetchmany(chunk_size)
            if not data:
                break
            yield data

def find_stop_index(current_time, lst):
    """function that will separate data streaming from database
    whether they have the same timestamp or not."""
    len_lst = len(lst)
    # use // operator to get only integer indexes.
    current_index = len_lst // 2

    # perform dichotomie
    while lst[current_index] == lst[current_index + 1]:
        # after index.
        if lst[current_index] != current_time:
            current_index = current_index // 2
        else:
            current_index = (current_index * 3) // 2
    return current_index

def send_data_to_client(message):
    # Connect to the database when needed.
    bdd = pymysql.connect(host='159.8.71.154', user='Pablo', password='Tz@42U_5v',
                db='pablo', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    print("Database connection is done")

    current_data = []
    current_time = datetime(2017, 7, 5, 11, 30)
    for chunck in sql_chunck_gene(bdd, 300, message['start'], message['end']):
        # in case we reach end of a timestamp, we send current data & begin
        # to store following timestamp data. (2017-7-5 11:21 then 2017-7-5 11:25, ...)
        print(f"time = {current_time}\nlast chunk time : {chunck[99]['date_extract']}\n")
        if chunck[99]['date_extract'] > current_time:
            stop_index = find_stop_index(current_time, chunck)

            # add the good part & send it
            current_data += chunck[:stop_index]
            emit("chunck_sent", json_dumps(current_data))

            # set new list of data
            current_time = chunck[stop_index]['date_extract']
            current_data = chunck[stop_index:]

        else:
            current_data += chunck
