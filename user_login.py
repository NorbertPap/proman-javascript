from flask import session, redirect, url_for, request, render_template
from functools import wraps


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
            return redirect(url_for('route_list'))
        else:
            return render_template("login_register.html", page='login', message='Invalid username or password')


@app.route("/registration", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template("login_register.html", page='register')
    elif request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        password = util.hash_password(password)
        check_user = data_manager.register_new_user(username, password, email)
        if check_user is True:
            return redirect(url_for('login', page='login'))
        elif check_user is False:
            return render_template("login_register.html", page='register', message='Username or e-mail in use')


@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect(url_for('login'))