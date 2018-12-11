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


# @connection.connection_handler
# def get_board_data(cursor, user_id):
#     cursor.execute("""SELECT boards.id AS board_id, boards.user_id, boards.private, boards.title AS board_title, board_columns.column_name, board_columns.id AS board_column_id, cards.id AS card_id, cards.title AS card_title, cards.position
#                       FROM boards
#                       LEFT OUTER JOIN board_columns ON boards.id = board_columns.board_id
#                       LEFT OUTER JOIN cards ON board_columns.id = cards.board_column_id
#                       WHERE private = 0 OR user_id = %(user_id)s;""", {'user_id': user_id})
#     boards = cursor.fetchall()
#     boards = turn_data_into_tree(boards)
#     return boards
#
#
# def turn_data_into_tree(board_data):
#     boards = []
#     for row in board_data:
#         if {'board_id': row.get('board_id'), 'private': row.get('private'), 'board_title': row.get('board_title'), 'user_id': row.get('user_id')} not in boards:
#             boards.append({'board_id': row.get('board_id'), 'private': row.get('private'),
#                            'board_title': row.get('board_title'), 'user_id': row.get('user_id')})
#     for board in boards:
#         board['columns'] = []
#         for row in board_data:
#             if row.get('board_id') == board.get('id'):
#                 board['columns'].append({'board_column_id': row.get('board_column_id'), 'column_name': row.get('column_name')})
#         for column in board['columns']:
#             for row in board_data:

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
                              WHERE board_column_id = %(board_column_id)s""", {'board_column_id': board_column.get('id')})
            board_column['cards'] = cursor.fetchall()
    return boards

