#!/usr/bin/python

from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
# from datahistory import BeersHistory
# from data import Beers
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, SelectField, validators
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


# BeersHistory = BeersHistory()
# Beers = Beers()


@app.route('/')
def index():
    return render_template('home.html')

@app.route('/about')
def about():
    # Create cursor
    cur = mysql.connection.cursor()

    # Get articles
    result = cur.execute("SELECT * FROM list_history ORDER BY name ASC")

    beers = cur.fetchall()

    if result > 0:
        return render_template('about.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('about.html', msg=msg)
    # Close connection
    cur.close()
    # return render_template('about.html', beershistory=BeersHistory)

@app.route('/beers')
def beers():
    # Create cursor
    cur = mysql.connection.cursor()

    # Get beers
    result = cur.execute("SELECT lc.id, lh.id, lh.name, lh.style, lh.abv, lh.ibu, lh.brewery, lh.location, lh.website, lh.description FROM list_history AS lh, list_current AS lc WHERE lh.id=lc.id_history")
    beers = cur.fetchall()

    if result > 0:
        return render_template('beers.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('beers.html', msg=msg)
    # Close connection
    cur.close()

# Single Beer
@app.route('/beer/<string:id>/')
def beer(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get article
    result = cur.execute("SELECT * FROM list_history WHERE id = %s", [id])

    beer = cur.fetchone()
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

    if result > 0:
        return render_template('dashboard.html', beers=beers)
    else:
        msg = 'No Beers Found'
    return render_template('dashboard.html', msg=msg)
    # Close connection
    cur.close()

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

# Add Beer
@app.route('/add_beer', methods=['GET', 'POST'])
@is_logged_in
def add_beer():
    form = BeerForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        style = form.style.data
        abv = form.abv.data
        ibu = form.ibu.data
        brewery = form.brewery.data
        location = form.location.data
        website = form.website.data
        description = form.description.data
        app.logger.info('name')
        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("INSERT INTO list_history(name, style, abv, ibu, brewery, location, website, description) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)", (name, style, abv, ibu, brewery, location, website, description))

        # Commit
        mysql.connection.commit()

        # Close connection
        cur.close()

        flash('Beer Created', 'success')

        return redirect(url_for('dashboard'))

    return render_template('add_beer.html', form=form)


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


    if request.method == 'POST' and form.validate():
        name = request.form['name']
        style = request.form['style']
        abv = request.form['abv']
        ibu = request.form['ibu']
        brewery = request.form['brewery']
        location = request.form['location']
        website = request.form['website']
        description = request.form['description']

        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("UPDATE list_history SET name=%s, style=%s, abv=%s, ibu=%s, brewery=%s, location=%s, website=%s, description=%s WHERE id=%s", (name, style, abv, ibu, brewery, location, website, description, id))

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

def getDefaultSelect(currentId):
    # Create cursor
    cur = mysql.connection.cursor()
    # Get the total beer list
    result = cur.execute("SELECT id_history FROM list_current WHERE id=%s", [currentId])
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
        beer16=beer16select['id_history']
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
        # Commit
        mysql.connection.commit()

        # Close connection
        cur.close()

        # app.logger.info(beer1)
        flash('Beer List Updated', 'success')

        return redirect(url_for('edit_beer_list'))
        # return redirect(url_for('beers'))

    return render_template('edit_beer_list.html', beers=beers, form=form)
    # Comment line above and uncomment line below to go to beerlist page after submitting the edit list form
    # return render_template('beers.html', beers=beers, form=form)

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)
