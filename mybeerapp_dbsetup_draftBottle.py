
import pymysql
import dbconfig
connection = pymysql.connect(host='localhost',
                             user=dbconfig.db_user,
                             passwd=dbconfig.db_password)

try:
    with connection.cursor() as cursor:

        sql = """ALTER TABLE myflaskapp.list_history ADD draft_bottle_selection VARCHAR(50) DEFAULT 'Draft' NOT NULL;"""
        cursor.execute(sql)

        connection.commit()

finally:
        connection.close()
