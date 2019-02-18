
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
                venue_name VARCHAR(100),
                name VARCHAR(100),
                username VARCHAR(30),
                password VARCHAR(100),
                email VARCHAR(100),
                register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.user_settings (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                venue_db_id VARCHAR(255),
                font_color VARCHAR(100),
                background_color VARCHAR(100),
                name_font_size INT(10),
                abv_ibu_fron_size INT(10),
                screen_template INT(10)
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.list_history (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                venue_db_id INT(255),
                name VARCHAR(100),
                style VARCHAR(100),
                abv VARCHAR(10),
                ibu VARCHAR(10),
                brewery VARCHAR(100),
                location VARCHAR(255),
                website VARCHAR(255),
                description TEXT,
                draft_bottle_selection VARCHAR(50),
                create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.list_current (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                venue_db_id INT(255),
                id_history INT(100),
                id_on_next INT(100),
                id_dropdown INT(100)
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.font_sizes (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                font_size VARCHAR(100)
                )"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.templates (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                templates VARCHAR(100),
                venue_db_id INT(255),
                active_template VARCHAR(100)
                )"""
        cursor.execute(sql)



        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "1", "1", "1")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "2", "2", "2")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "3", "3", "3")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "4", "4", "4")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "5", "5", "5")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "6", "6", "6")"""
        ursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "7", "7", "7")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "8", "8", "8")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "9", "9", "9")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "10", "10", "10")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "11", "11", "11")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "12", "12", "12")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "13", "13", "13")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "14", "14", "14")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "15", "15", "15")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "16", "16", "16")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "17", "17", "17")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "18", "18", "18")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "19", "19", "19")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "20", "20", "20")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "21", "21", "21")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("0", "22", "22", "22")"""
        cursor.execute(sql)
        connection.commit()

finally:
        connection.close()
