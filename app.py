#!/usr/bin/python
#7/24/18-03:08pm

from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, jsonify
# from datahistory import BeersHistory
# from data import Beers
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, SelectField, RadioField, validators
from passlib.hash import sha256_crypt
from functools import wraps

app = Flask(__name__)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'qwerty'
app.config['MYSQL_DB'] = 'myflaskapp'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# init MYSQL
mysql = MySQL(app)

def mysqlQuery(query, fetch):
    cur = mysql.connection.cursor()
    # Get beers
    mysqlQuery = cur.execute(query)
    if fetch == 'all':
        result = cur.fetchall()
    else:
        result = cur.fetchone()

    # Close connection
    cur.close()
    return result

@app.route('/testing')
def testing():
    return render_template('testing.html')

@app.route('/')
def index():
    return render_template('home.html')

##########################
#testing AJAX
@app.route('/proccess_print', methods=['GET', 'POST'])
def proccess_print():
    beers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history", "all")
    beers_01_16 = beers[0:16]
    beers_17_22 = beers[16:22]

    if beers > 0:
        jsonify(beers);
        return render_template('proccess_print.html', beers=beers, beers0116=beers_01_16, beers1722=beers_17_22)
        # return render_template('beers_print.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('proccess_print.html', msg=msg, beers=beers)

@app.route('/update', methods=['POST'])
def update():
    beers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history", "all")
    beers_01_16 = beers[0:16]
    beers_17_22 = beers[16:22]
    return jsonify(beers);

@app.route('/updateBeers', methods=['POST'])
def updateBeers():
    beers = mysqlQuery("SELECT * FROM list_history ORDER BY name ASC", "all")
    return jsonify(beers)

@app.route('/updateTappingNext', methods=['POST'])
def updateTappingNext():
    nextBeers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_on_next", "all")
    return jsonify(nextBeers)
#end testing AJAX
##########################


##############################################
# BEGIN ALL MENU
##############################################
@app.route('/draft_beers', methods=['GET', 'POST'])
def draft_beers():
    beers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history", "all")
    beers_01_16 = beers[0:16]
    beers_17_22 = beers[16:22]
    if beers > 0:
        jsonify(beers);
        return render_template('draft_beers.html', beers=beers, beers0116=beers_01_16, beers1722=beers_17_22)
        # return render_template('beers_print.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('draft_beers.html', msg=msg, beers=beers)
@app.route('/bottle_beers', methods=['GET', 'POST'])
def bottle_beers():
    beers = mysqlQuery("SELECT * FROM list_history ORDER BY name ASC", "all")
    app.logger.info(beers)
    if beers > 0:
        jsonify(beers);
        return render_template('bottle_beers.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('bottle_beers.html', msg=msg, beers=beers)
##############################################
# END ALL MENU
##############################################

##############################################
# Begin Testing of TV screen layout
##############################################

# Current list of whats on tap screen testing
@app.route('/beers_tv_screen')
def beers_tv_screen():
    # Create cursor
    cur = mysql.connection.cursor()

    # Get beers
    result = cur.execute("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history")
    beers = cur.fetchall()
    beers = beers[0:22]
    beers_01_08 = beers[0:8]
    beers_08_16 = beers[8:16]
    beers_16_22 = beers[16:22]

    # Close connection
    cur.close()

    if result > 0:
        return render_template('beers_tv_screen.html', beers=beers, beers0108=beers_01_08, beers0816=beers_08_16, beers1622=beers_16_22)
    else:
        msg = 'No Beers Found'
    return render_template('beers_tv_screen.html', msg=msg)

##############################################
#End TV screen layout test
##############################################

# Total history of beers
@app.route('/about')
def about():
    # # Create cursor
    # cur = mysql.connection.cursor()
    #
    # # Get beers
    # result = cur.execute("SELECT * FROM list_history ORDER BY name ASC")
    # beers = cur.fetchall()
    #
    # # Close connection
    # cur.close()

    beers = mysqlQuery("SELECT * FROM list_history ORDER BY name ASC", "all")

    # if result > 0:
    if beers:
        return render_template('about.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('about.html', msg=msg)

# Screen to print list
@app.route('/beers_print')
def beers_print():
    # # Create cursor
    # cur = mysql.connection.cursor()
    # # Get beers
    # result = cur.execute("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history")
    # beers = cur.fetchall()
    # # app.logger.info(len(beers))
    # # beers_01_16 = beers[0:16]
    # # beers_17_21 = beers[16:21]
    # # app.logger.info(len(beers_17_21))
    #
    # # Close connection
    # cur.close()

    beers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history", "all")
    beers_01_16 = beers[0:16]
    beers_17_22 = beers[16:22]

    if beers > 0:
        return render_template('beers_print.html', beers=beers_01_16, beers1722=beers_17_22)
        # return render_template('beers_print.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('beers_print.html', msg=msg)

# Current list of whats on tap
@app.route('/beers')
def beers():
    # Create cursor
    cur = mysql.connection.cursor()

    # Get beers
    result = cur.execute("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history")
    beers = cur.fetchall()
    beers = beers[0:16]
    beers_01_08 = beers[0:8]
    beers_08_16 = beers[8:16]

    # Close connection
    cur.close()

    if result > 0:
        return render_template('beers.html', beers=beers, beers0108=beers_01_08, beers0816=beers_08_16)
    else:
        msg = 'No Beers Found'
    return render_template('beers.html', msg=msg)

# Single Beer
@app.route('/beer/<string:id>/')
def beer(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get article
    result = cur.execute("SELECT * FROM list_history WHERE id = %s", [id])

    # Get single beer
    beer = cur.fetchone()

    # Close connection
    cur.close()

    return render_template('beer.html', beer=beer)

# Register Form Class
class RegisterForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')

# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))

        # Create cursor
        cur = mysql.connection.cursor()

        # Execute query
        cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)", (name, email, username, password))

        # Commit to DB
        mysql.connection.commit()
        # Close connection
        cur.close()

        flash('You are now registered and can log in', 'success')

        return redirect(url_for('login'))
    return render_template('register.html', form=form)

# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get Form Fields
        username = request.form['username']
        password_candidate = request.form['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']

            # Compare passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username

                flash('You are now logged in', 'success')
                return redirect(url_for('dashboard'))
                # Close connection
                cur.close()
            else:
                error = 'Invalid login'
                return render_template('login.html', error=error)
        else:
            error = 'Username not found'
            return render_template('login.html', error=error)
    return render_template('login.html')

# Check if user logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('login'))
    return wrap

# Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

# Dashboard
@app.route('/dashboard')
@is_logged_in
def dashboard():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get articles
    result = cur.execute("SELECT * FROM list_history ORDER BY name ASC")
    beers = cur.fetchall()
    # Close connection
    cur.close()

    # Close connection
    cur.close()

    if result > 0:
        return render_template('dashboard.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('dashboard.html', msg=msg)


# Beer Form Class
class BeerForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=100)])
    style = StringField('Style', [validators.Length(min=0, max=50)])
    abv = StringField('Abv', [validators.Length(min=0, max=10)])
    ibu = StringField('Ibu', [validators.Length(min=0, max=10)])
    brewery = StringField('Brewery', [validators.Length(min=0, max=100)])
    location = StringField('Location', [validators.Length(min=0, max=255)])
    website = StringField('Website', [validators.Length(min=0, max=255)])
    description = TextAreaField('Description', [validators.Length(min=0)])
#########################radio button to choose draft or bottle or both
    draftBottle = RadioField(u'Beer Choice', choices=[('Draft','Draft'), ('Bottle','Bottle'), ('Both','Both')])

# Add Beer
@app.route('/add_beer', methods=['GET', 'POST'])
@is_logged_in
def add_beer():
    form = BeerForm(request.form)

    form.draftBottle.data = "Draft"

    if request.method == 'POST' and form.validate():
        name = form.name.data
        style = form.style.data
        abv = form.abv.data
        ibu = form.ibu.data
        brewery = form.brewery.data
        location = form.location.data
        website = form.website.data
        description = form.description.data
#########################radio button to choose draft or bottle or both
        # draftBottle = form.draftBottle.data
        draftBottle = request.form['draftBottle']
        app.logger.info(draftBottle)
        app.logger.info('name')

        app.logger.info(name)
        app.logger.info(draftBottle)
        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("INSERT INTO list_history(name, style, abv, ibu, brewery, location, website, description, draft_bottle_selection) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)", (name, style, abv, ibu, brewery, location, website, description, draftBottle))

        # Commit
        mysql.connection.commit()

        # Close connection
        cur.close()

        flash('Beer Created', 'success')

        return redirect(url_for('dashboard'))

    return render_template('add_beer.html', form=form)

# Search beers from untappd
@app.route('/beersearch', methods=['GET','POST'])
@is_logged_in
def beersearch():
    return render_template('beersearch.html')

# Add untappd beer info to DB
@app.route('/addUntappd', methods=['POST'])
def addUntappd():
    data = request.get_json()
    app.logger.info(data['id'])
    app.logger.info(data['name'])
    app.logger.info(data['style'])
    app.logger.info(data['abv'])
    app.logger.info(data['ibu'])
    app.logger.info(data['brewery'])
    app.logger.info(data['location'])
    app.logger.info(data['website'])
    app.logger.info(data['description'])
    app.logger.info(data['draftbottleselection'])
    print('Beer ' + data['id'] + ': ' + data['name'] + ' has been added to the database. Thank you for playing along. Have a "hoppy" day.')

    name = data['name']
    style = data['style']
    abv = data['abv']
    ibu = data['ibu']
    brewery = data['brewery']
    location = data['location']
    website = data['website']
    description = data['description']
    draftBottle = data['draftbottleselection']

    # Send data to DB
    # mysqlQuery = "INSERT INTO list_history(name, style, abv, ibu, brewery, location, website, description, draft_bottle_selection) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)", (name, style, abv, ibu, brewery, location, website, description, draftBottle)
    # mysqlQuerySend(mysqlQuery)

    cur = mysql.connection.cursor()
    # Execute
    cur.execute("INSERT INTO list_history(name, style, abv, ibu, brewery, location, website, description, draft_bottle_selection) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)", (name, style, abv, ibu, brewery, location, website, description, draftBottle))
    # Commit
    mysql.connection.commit()
    # Close connection
    cur.close()

    return jsonify(data)


# Edit Beer
@app.route('/edit_beer/<string:id>', methods=['GET', 'POST'])
@is_logged_in
def edit_beer(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get beer by id
    result = cur.execute("SELECT * FROM list_history WHERE id = %s", [id])

    beer = cur.fetchone()

    # Get form
    form = BeerForm(request.form)

    # Populate beer form fields
    form.name.data = beer['name']
    form.style.data = beer['style']
    form.abv.data = beer['abv']
    form.ibu.data = beer['ibu']
    form.brewery.data = beer['brewery']
    form.location.data = beer['location']
    form.website.data = beer['website']
    form.description.data = beer['description']
    form.draftBottle.data = beer['draft_bottle_selection']

    if request.method == 'POST' and form.validate():
        name = request.form['name']
        style = request.form['style']
        abv = request.form['abv']
        ibu = request.form['ibu']
        brewery = request.form['brewery']
        location = request.form['location']
        website = request.form['website']
        description = request.form['description']
        draftBottle = request.form['draftBottle']
        draftBottle = request.form['draftBottle']
        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("UPDATE list_history SET name=%s, style=%s, abv=%s, ibu=%s, brewery=%s, location=%s, website=%s, description=%s, draft_bottle_selection=%s WHERE id=%s", (name, style, abv, ibu, brewery, location, website, description, draftBottle, id))
        # Commit
        mysql.connection.commit()

        # Close connection
        cur.close()

        flash('Beer Updated', 'success')

        return redirect(url_for('dashboard'))

    return render_template('edit_beer.html', form=form)

# Delete Beer
@app.route('/delete_beer/<string:id>', methods=['POST'])
@is_logged_in
def delete_beer(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Execute
    cur.execute("DELETE FROM list_history WHERE id = %s", [id])

    # Commit
    mysql.connection.commit()

    # Close connection
    cur.close()

    flash('Beer Deleted', 'success')

    return redirect(url_for('dashboard'))

# Class for the beer list
class CurrentBeerListForm(Form):
    beer1 = SelectField(u'Beer 1', coerce=int, option_widget=None)
    beer2 = SelectField(u'Beer 2', coerce=int, option_widget=None)
    beer3 = SelectField(u'Beer 3', coerce=int, option_widget=None)
    beer4 = SelectField(u'Beer 4', coerce=int, option_widget=None)
    beer5 = SelectField(u'Beer 5', coerce=int, option_widget=None)
    beer6 = SelectField(u'Beer 6', coerce=int, option_widget=None)
    beer7 = SelectField(u'Beer 7', coerce=int, option_widget=None)
    beer8 = SelectField(u'Beer 8', coerce=int, option_widget=None)
    beer9 = SelectField(u'Beer 9', coerce=int, option_widget=None)
    beer10 = SelectField(u'Beer 10', coerce=int, option_widget=None)
    beer11 = SelectField(u'Beer 11', coerce=int, option_widget=None)
    beer12 = SelectField(u'Beer 12', coerce=int, option_widget=None)
    beer13 = SelectField(u'Beer 13', coerce=int, option_widget=None)
    beer14 = SelectField(u'Beer 14', coerce=int, option_widget=None)
    beer15 = SelectField(u'Beer 15', coerce=int, option_widget=None)
    beer16 = SelectField(u'Beer 16', coerce=int, option_widget=None)
    beer17 = SelectField(u'Beer 17', coerce=int, option_widget=None)
    beer18 = SelectField(u'Beer 18', coerce=int, option_widget=None)
    beer19 = SelectField(u'Beer 19', coerce=int, option_widget=None)
    beer20 = SelectField(u'Beer 20', coerce=int, option_widget=None)
    beer21 = SelectField(u'Beer 21', coerce=int, option_widget=None)
    #tickerHeadline
    beer22 = SelectField(u'Ticker Headline', coerce=int, option_widget=None)

# Class for the beer list
class NextBeerListForm(Form):
    beer1 = SelectField(u'Beer 1', coerce=int, option_widget=None)
    beer2 = SelectField(u'Beer 2', coerce=int, option_widget=None)
    beer3 = SelectField(u'Beer 3', coerce=int, option_widget=None)
    beer4 = SelectField(u'Beer 4', coerce=int, option_widget=None)
    beer5 = SelectField(u'Beer 5', coerce=int, option_widget=None)
    beer6 = SelectField(u'Beer 6', coerce=int, option_widget=None)
    beer7 = SelectField(u'Beer 7', coerce=int, option_widget=None)
    beer8 = SelectField(u'Beer 8', coerce=int, option_widget=None)
    beer9 = SelectField(u'Beer 9', coerce=int, option_widget=None)
    beer10 = SelectField(u'Beer 10', coerce=int, option_widget=None)
    beer11 = SelectField(u'Beer 11', coerce=int, option_widget=None)
    beer12 = SelectField(u'Beer 12', coerce=int, option_widget=None)
    beer13 = SelectField(u'Beer 13', coerce=int, option_widget=None)
    beer14 = SelectField(u'Beer 14', coerce=int, option_widget=None)
    beer15 = SelectField(u'Beer 15', coerce=int, option_widget=None)
    beer16 = SelectField(u'Beer 16', coerce=int, option_widget=None)

def getDefaultSelect(currentId):
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the total beer list
    result = cur.execute("SELECT id_history FROM list_current WHERE id=%s", [currentId])
    thisBeer = cur.fetchone()
    app.logger.info(thisBeer)
    return thisBeer

def getDefaultNextSelect(nextId):
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the total beer list
    result = cur.execute("SELECT id_on_next FROM list_current WHERE id=%s", [nextId])
    thisBeer = cur.fetchone()
    app.logger.info(thisBeer)
    return thisBeer

# Edit Beer List
@app.route('/edit_beer_list', methods=['GET', 'POST'])
@is_logged_in
def edit_beer_list():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the total beer list
    results = cur.execute("SELECT * FROM list_history ORDER BY name ASC")
    # Gets the whole list of query results
    beers = cur.fetchall()

    # results = cur.execute("""SELECT * FROM list_history WHERE id BETWEEN "1" AND "17" ORDER BY name ASC""")
    # beers = cur.fetchall()
    # results = cur.execute("""SELECT * FROM list_history WHERE id BETWEEN "17" AND "21" ORDER BY name ASC""")
    # beers_17_21 = cur.fetchall()

    # Creates a beerDefault object from the CurrentBeerListDefault() Class
    # beerDefault = CurrentBeerListDefault()

    # Call the getDefaultSelect() method to get id_history from list_current table
    beer1select = getDefaultSelect('1')
    beer2select = getDefaultSelect('2')
    beer3select = getDefaultSelect('3')
    beer4select = getDefaultSelect('4')
    beer5select = getDefaultSelect('5')
    beer6select = getDefaultSelect('6')
    beer7select = getDefaultSelect('7')
    beer8select = getDefaultSelect('8')
    beer9select = getDefaultSelect('9')
    beer10select = getDefaultSelect('10')
    beer11select = getDefaultSelect('11')
    beer12select = getDefaultSelect('12')
    beer13select = getDefaultSelect('13')
    beer14select = getDefaultSelect('14')
    beer15select = getDefaultSelect('15')
    beer16select = getDefaultSelect('16')
    beer17select = getDefaultSelect('17')
    beer18select = getDefaultSelect('18')
    beer19select = getDefaultSelect('19')
    beer20select = getDefaultSelect('20')
    beer21select = getDefaultSelect('21')
    #tickerHeadline
    beer22select = getDefaultSelect('22')

    app.logger.info(beer1select)
    form = CurrentBeerListForm(request.form,
        beer1=beer1select['id_history'],
        beer2=beer2select['id_history'],
        beer3=beer3select['id_history'],
        beer4=beer4select['id_history'],
        beer5=beer5select['id_history'],
        beer6=beer6select['id_history'],
        beer7=beer7select['id_history'],
        beer8=beer8select['id_history'],
        beer9=beer9select['id_history'],
        beer10=beer10select['id_history'],
        beer11=beer11select['id_history'],
        beer12=beer12select['id_history'],
        beer13=beer13select['id_history'],
        beer14=beer14select['id_history'],
        beer15=beer15select['id_history'],
        beer16=beer16select['id_history'],
        beer17=beer17select['id_history'],
        beer18=beer18select['id_history'],
        beer19=beer19select['id_history'],
        beer20=beer20select['id_history'],
        beer21=beer21select['id_history'],
        #tickerHeadline
        beer22=beer22select['id_history'],
    )

    form.beer1.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer2.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer3.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer4.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer5.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer6.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer7.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer8.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer9.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer10.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer11.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer12.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer13.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer14.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer15.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer16.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer17.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer18.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer19.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer20.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer21.choices = [(beer['id'], beer['name']) for beer in beers]
    # tickerHeadline
    form.beer22.choices = [(beer['id'], beer['name']) for beer in beers]



    if request.method == 'POST' and form.validate():
        beer1 = request.form['beer1']
        beer2 = request.form['beer2']
        beer3 = request.form['beer3']
        beer4 = request.form['beer4']
        beer5 = request.form['beer5']
        beer6 = request.form['beer6']
        beer7 = request.form['beer7']
        beer8 = request.form['beer8']
        beer9 = request.form['beer9']
        beer10 = request.form['beer10']
        beer11 = request.form['beer11']
        beer12 = request.form['beer12']
        beer13 = request.form['beer13']
        beer14 = request.form['beer14']
        beer15 = request.form['beer15']
        beer16 = request.form['beer16']
        beer17 = request.form['beer17']
        beer18 = request.form['beer18']
        beer19 = request.form['beer19']
        beer20 = request.form['beer20']
        beer21 = request.form['beer21']
        #tickerHeadline
        beer22 = request.form['beer22']

        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer1, '1'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer2, '2'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer3, '3'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer4, '4'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer5, '5'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer6, '6'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer7, '7'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer8, '8'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer9, '9'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer10, '10'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer11, '11'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer12, '12'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer13, '13'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer14, '14'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer15, '15'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer16, '16'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer17, '17'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer18, '18'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer19, '19'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer20, '20'))
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer21, '21'))
        #tickerHeadline
        cur.execute("UPDATE list_current SET id_history=%s WHERE id=%s", (beer22, '22'))

        # Commit
        mysql.connection.commit()

        # Close connection
        cur.close()

        # app.logger.info(beer1)
        flash('Beer List Updated', 'success')

        # return redirect(url_for('edit_beer_list'))
        return redirect(url_for('edit_beer_list'))

    return render_template('edit_beer_list.html', beers=beers, form=form)
    # return render_template('proccess_print.html', beers=beers, form=form)

    # Comment line above and uncomment line below to go to beerlist page after submitting the edit list form
    # return render_template('beers.html', beers=beers, form=form)

##############################################
# BEGIN ON_TAP_NEXT SCREEN
##############################################
@app.route('/on_tap_next', methods=['GET', 'POST'])
def on_tap_next():
    currentBeers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history", "all")
    currentBeers = currentBeers[0:16]
    nextBeers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_on_next", "all")
    return render_template('on_tap_next.html', currentBeers=currentBeers, nextBeers=nextBeers)

@app.route('/on_tap_next_editor', methods=['GET','POST'])
@is_logged_in
def on_tap_next_editor():
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the total beer list
    results = cur.execute("SELECT * FROM list_history ORDER BY name ASC")
    # Gets the whole list of query results
    beers = cur.fetchall()

    currentBeers = mysqlQuery("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history", "all")

    # Call the getDefaultNextSelect() method to get id_history from list_current table
    beer1select = getDefaultNextSelect('1')
    beer2select = getDefaultNextSelect('2')
    beer3select = getDefaultNextSelect('3')
    beer4select = getDefaultNextSelect('4')
    beer5select = getDefaultNextSelect('5')
    beer6select = getDefaultNextSelect('6')
    beer7select = getDefaultNextSelect('7')
    beer8select = getDefaultNextSelect('8')
    beer9select = getDefaultNextSelect('9')
    beer10select = getDefaultNextSelect('10')
    beer11select = getDefaultNextSelect('11')
    beer12select = getDefaultNextSelect('12')
    beer13select = getDefaultNextSelect('13')
    beer14select = getDefaultNextSelect('14')
    beer15select = getDefaultNextSelect('15')
    beer16select = getDefaultNextSelect('16')


    app.logger.info(beer1select)
    form = NextBeerListForm(request.form,
        beer1=beer1select['id_on_next'],
        beer2=beer2select['id_on_next'],
        beer3=beer3select['id_on_next'],
        beer4=beer4select['id_on_next'],
        beer5=beer5select['id_on_next'],
        beer6=beer6select['id_on_next'],
        beer7=beer7select['id_on_next'],
        beer8=beer8select['id_on_next'],
        beer9=beer9select['id_on_next'],
        beer10=beer10select['id_on_next'],
        beer11=beer11select['id_on_next'],
        beer12=beer12select['id_on_next'],
        beer13=beer13select['id_on_next'],
        beer14=beer14select['id_on_next'],
        beer15=beer15select['id_on_next'],
        beer16=beer16select['id_on_next'],
    )

    form.beer1.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer2.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer3.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer4.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer5.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer6.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer7.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer8.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer9.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer10.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer11.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer12.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer13.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer14.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer15.choices = [(beer['id'], beer['name']) for beer in beers]
    form.beer16.choices = [(beer['id'], beer['name']) for beer in beers]

    if request.method == 'POST' and form.validate():
        beer1 = request.form['beer1']
        beer2 = request.form['beer2']
        beer3 = request.form['beer3']
        beer4 = request.form['beer4']
        beer5 = request.form['beer5']
        beer6 = request.form['beer6']
        beer7 = request.form['beer7']
        beer8 = request.form['beer8']
        beer9 = request.form['beer9']
        beer10 = request.form['beer10']
        beer11 = request.form['beer11']
        beer12 = request.form['beer12']
        beer13 = request.form['beer13']
        beer14 = request.form['beer14']
        beer15 = request.form['beer15']
        beer16 = request.form['beer16']

        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer1, '1'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer2, '2'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer3, '3'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer4, '4'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer5, '5'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer6, '6'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer7, '7'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer8, '8'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer9, '9'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer10, '10'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer11, '11'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer12, '12'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer13, '13'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer14, '14'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer15, '15'))
        cur.execute("UPDATE list_current SET id_on_next=%s WHERE id=%s", (beer16, '16'))

        # Commit
        mysql.connection.commit()

        # Close connection
        cur.close()

        # app.logger.info(beer1)
        flash('Beer List Updated', 'success')

        # return redirect(url_for('edit_beer_list'))
        return redirect(url_for('on_tap_next_editor'))

    return render_template('on_tap_next_editor.html', beers=beers, currentBeers=currentBeers, form=form)

##############################################
# END ON_TAP_NEXT SCREEN
##############################################

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)
