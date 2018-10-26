import pymysql
import dbconfig
connection = pymysql.connect(host='localhost',
                             user=dbconfig.db_user,
                             passwd=dbconfig.db_password)

try:
    with connection.cursor() as cursor:
        sql = "CREATE DATABASE IF NOT EXISTS myflaskapp"
        cursor.execute(sql)
        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.wines (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                location VARCHAR(100),
                description TEXT,
                glass VARCHAR(10),
                bottle VARCHAR(10),
                varietal VARCHAR(100)
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.winelist_current (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                id_wine INT(100)
                )"""
        cursor.execute(sql)

        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("1")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("2")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("3")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("4")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("5")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("6")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("7")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("8")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("9")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("10")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("11")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("12")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("13")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("14")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("15")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("16")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("17")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("18")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("19")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("20")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("21")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("22")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("23")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("24")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("25")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.winelist_current (id_wine) VALUES ("26")"""
        cursor.execute(sql)


        connection.commit()

finally:
        connection.close()
