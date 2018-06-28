
import pymysql
import dbconfig
connection = pymysql.connect(host='localhost',
                             user=dbconfig.db_user,
                             passwd=dbconfig.db_password)

try:
    with connection.cursor() as cursor:
        sql = "CREATE DATABASE IF NOT EXISTS myflaskapp"
        cursor.execute(sql)
        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.users (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                username VARCHAR(30),
                password VARCHAR(100),
                email VARCHAR(100),
                register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.list_history (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                style VARCHAR(100),
                abv VARCHAR(10),
                ibu VARCHAR(10),
                brewery VARCHAR(100),
                location VARCHAR(255),
                website VARCHAR(255),
                description TEXT,
                create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.list_current (
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                id_history INT(100)
                )"""
        cursor.execute(sql)
	
	sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("1")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("2")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("3")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("4")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("5")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("6")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("7")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("8")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("9")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("10")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("11")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("12")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("13")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("14")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("15")"""
	cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (id_history) VALUES ("16")"""
	cursor.execute(sql)
        connection.commit()

finally:
        connection.close()

