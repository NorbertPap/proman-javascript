// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();

}

init();

@connection.connection_handler
def register_new_user(cursor, username, password):
    cursor.execute("""INSERT INTO user_info (user_name, pw_hash)
                      VALUES (%(name)s, %(pw)s);""",{'name': username, 'pw': password})


@connection.connection_handler
def user_login(cursor, username, password):
    cursor.execute("""
                    SELECT * FROM user_info;
                    """)
    users = cursor.fetchall()
    for data in users:
        if username == data['user_name']:
            if verify_password(password, data['pw_hash']) is True:
                return True
            if verify_password(password, data['pw_hash']) is False:
                return False