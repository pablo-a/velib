from impala.dbapi import connect

def main():
    bdd = connect(host='167.114.235.165', port=21050)
    cursor = bdd.cursor()
    cursor.execute("USE road_traffic_data")
    cursor.execute('SHOW TABLES')
    cursor.execute("SELECT * FROM velib_data LIMIT 100000")

    for elem in cursor.fetchall():
        print(elem)


if __name__ == '__main__':
    main()
