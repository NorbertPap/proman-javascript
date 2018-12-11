from flask import Flask, render_template, session, redirect, url_for, request
from functools import wraps
from werkzeug.security import generate_password_hash
import data_manager

app = Flask(__name__)
app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login'))
    return wrap


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login_register.html", page='login')
    elif request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        check_user = data_manager.user_login(username, password)
        if check_user[0] is True:
            session['logged_in'] = True
            session['username'] = username
            session['user_id'] = check_user[1]
            return redirect(url_for('boards'))
        else:
            return render_template("login_register.html", page='login', message='Invalid username or password')


@app.route("/registration", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template("login_register.html", page='register')
    elif request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        password = generate_password_hash(password)
        check_user = data_manager.register_new_user(username, password)
        if check_user is True:
            return redirect(url_for('login', page='login'))
        elif check_user is False:
            return render_template("login_register.html", page='register', message='Username in use')


@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect(url_for('login'))


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    if 'logged_in' in session:
        status = f'Logged in as {session["username"]}'
    else:
        status = 'Not logged in'
    return render_template('boards.html', status=status)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
