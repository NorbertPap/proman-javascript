// This function is to initialize the application
function init() {
    submitButton();
    loginButton();
    registerButton();
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();
}


function registerButton()
{
    let btn = document.getElementsByClassName('btn-outline-primary')[1];
    btn.addEventListener('click', function () {
        let button = document.getElementById('login-register-btn');
        button.innerText = 'Register';
        let username = document.getElementById('exampleInputUsername1');
        username.style.display = 'block';
    });
}


function loginButton()
{
    let username = document.getElementById('exampleInputUsername1');
    username.style.display = 'none';
    let btn = document.getElementsByClassName('btn-outline-primary')[0];
    btn.addEventListener('click', function () {
        let button = document.getElementById('login-register-btn');
        button.innerText = 'Login';
        let username = document.getElementById('exampleInputUsername1');
        username.style.display = 'none';
    });
}


function submitButton()
{
    let btn = document.getElementById('login-register-btn');
    btn.addEventListener('click', function () {
        let btn = document.getElementsByClassName('btn btn-outline-primary active');
        for (let l_or_r of btn) {
            let statusBtn = l_or_r.textContent.trim();
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/login_and_register', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (xhr.responseText === 'success') {
                        location.reload();
                    } else if (xhr.responseText === 'failed login') {
                        let alert = document.getElementById('alert-text');
                        alert.innerText = 'Invalid E-mail or Password!';
                    } else {
                        let alert = document.getElementById('alert-text');
                        alert.innerText = 'E-mail or Username already in use!';
                    }
                }
            };
            xhr.send(JSON.stringify({
                'status' : statusBtn,
                'email': document.getElementById('exampleInputEmail1').value,
                'password': document.getElementById('exampleInputPassword1').value,
                'username' : document.getElementById('exampleInputUsername1').value
            }));
            event.stopPropagation();
        }
    });
}


init();