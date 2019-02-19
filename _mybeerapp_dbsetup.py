
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
        sql = """INSERT INTO myflaskapp.users (venue_name, name, username, password, email) VALUES ("admin", "admin", "admin", "", "admin@emdail.com")"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.user_settings (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                venue_db_id INT(255),
                font_color VARCHAR(100),
                background_color VARCHAR(100),
                name_font_size INT(10),
                abv_ibu_font_size INT(10),
                screen_template INT(10)
                )"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.user_settings (venue_db_id, font_color, background_color, name_font_size, abv_ibu_font_size, screen_template) VALUES ("1", "#000000", "#000000", "1", "1", "1")"""
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

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.font_size_options (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                venue_db_id INT(255),
                font_size VARCHAR(100)
                )"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.font_size_options (venue_db_id, font_sizes) VALUES ("0", "1.0em")"""
        cursor.execute(sql)

        sql = """CREATE TABLE IF NOT EXISTS myflaskapp.templates (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                templates VARCHAR(100),
                venue_db_id INT(255),
                active_template VARCHAR(100)
                )"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.templates (venue_db_id, templates, active_template) VALUES ("1", "1 Column", "disabled")"""
        cursor.execute(sql)


        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "1")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "2")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "3")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "4")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "5")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "6")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "7")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "8")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "9")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "10")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "11")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "12")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "13")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "14")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "15")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "16")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "17")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "18")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "19")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "20")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "21")"""
        cursor.execute(sql)
        sql = """INSERT INTO myflaskapp.list_current (venue_db_id, id_history, id_on_next, id_dropdown) VALUES ("1", "1", "1", "22")"""
        cursor.execute(sql)
        connection.commit()

finally:
        connection.close()
