from impala.dbapi import connect

def main():
    conn = connect(host='my.impala.host', port=21050)
    cur = conn.cursor()


if __name__ == '__main__':
    main()
