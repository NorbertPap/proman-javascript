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


@connection.connection_handler
def get_board_tree(cursor, user_id):
    cursor.execute("""SELECT * FROM boards
                      WHERE private = 0 OR user_id = %(user_id)s""", {'user_id': user_id})
    boards = cursor.fetchall()
    for board in boards:
        cursor.execute("""SELECT * FROM board_columns
                          WHERE board_id = %(board_id)s""", {'board_id': board.get('id')})
        board['columns'] = cursor.fetchall()
        for board_column in board['columns']:
            cursor.execute("""SELECT * FROM cards
                              WHERE board_column_id = %(board_column_id)s
                              ORDER BY position ASC""", {'board_column_id': board_column.get('id')})
            board_column['cards'] = cursor.fetchall()
    return boards


@connection.connection_handler
def add_new_column(cursor, column_name, board_id):
    cursor.execute("""INSERT INTO board_columns (column_name, board_id)
                      VALUES (%(column_name)s, %(board_id)s)""", {'column_name': column_name, 'board_id': board_id})
