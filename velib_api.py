import requests
import json
from time import localtime, strftime
from pablo import Pablo


def fetch_velib_data():
    with open("credential.txt", "r") as f:
        apiKey = f.readline()

    uri = "https://api.jcdecaux.com/vls/v1/stations?apiKey=9ea14072f364e9262198bdf89657952534d6531b&contract=Paris"
    response = requests.get(uri)
    data = json.loads(response.content)
    return data

def main():
    insert_query = """INSERT INTO velib
    (`number`, name, address, latitude, longitude, banking, bonus, status, bike_stands,
    available_bike_stands, available_bikes, last_update, date_extract)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    lst_params = []

    lst_station = fetch_velib_data()

    for item in lst_station:
        update = strftime("%Y-%m-%d %H:%M", localtime(item['last_update'] / 1000))
        today = strftime("%Y-%m-%d %H:%M")
        station = (item['number'], item['name'], item['address'],
        item['position']['lat'], item['position']['lng'], item['banking'], item['bonus'],
        item['status'], item['bike_stands'], item['available_bike_stands'],
        item['available_bikes'], update, today)
        lst_params.append(station)

    #hardcore one :
    # [lst.append(item['number'], item['name'], item['address'],
    # item['position']['lat'], item['position']['lng'], item['banking'],
    # item['bonus'], item['status'], item['bike_stands'],
    # item['available_bike_stands'], item['available_bikes'],
    # strftime("%Y%m%d %H:%M", localtime(item['last_update'] / 1000)))
    # for item in fetch_velib_data()]

    bdd = Pablo()
    bdd.cursor.executemany(insert_query, lst_params)
    bdd.close()


if __name__ == '__main__':
    main()
