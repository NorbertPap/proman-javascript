import connection
from werkzeug.security import check_password_hash
import psycopg2


@connection.connection_handler
def register_new_user(cursor, username, password):
    try:
        cursor.execute("""INSERT INTO users (user_name, hashed_pw)
                          VALUES (%(name)s, %(pw)s);""", {'name': username, 'pw': password})
        return True
    except psycopg2.IntegrityError:
        return False


@connection.connection_handler
def user_login(cursor, username, password):
    cursor.execute("""
                    SELECT * FROM users
                    WHERE user_name = %(username)s;
                    """, {'username': username})
    user = cursor.fetchone()
    if user is not None:
        return check_password_hash(user.get('hashed_pw'), password), user.get('id')
    return False
