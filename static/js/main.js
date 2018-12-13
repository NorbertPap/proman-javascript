// This function is to initialize the application
function init() {
    submitButton();
    loginButton();
    registerButton();
    makeCardsDragAndDroppable();
    makeBoardAddingButtonFunctional();
    buttonPress();
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();
}


function makeCardsDragAndDroppable()
{
    for(let i=0; i<document.getElementsByClassName('container').length; i++)
    {
        let columns = [];
        for(let j=0; j<document.getElementsByClassName('container')[i].getElementsByClassName('cards_column').length; j++)
        {
            columns.push(document.getElementById(`${String(i)+String(j)}`));
        }
        dragula(columns);
    }
}

function makeBoardAddingButtonFunctional()
{
    let boardAddingButton = document.getElementById('add-board');
    boardAddingButton.addEventListener('click', createNewBoard);
}


function createNewBoard()
{
    document.getElementById('add-board').disabled = true;
    createInputForNewBoard()
}


function createInputForNewBoard()
{
    document.getElementById('new-board-input').hidden = false;
    let createButton = document.getElementById('create-board');
    let cancelButton = document.getElementById('cancel-board');
    createButton.addEventListener('click', registerNewBoard);
    cancelButton.addEventListener('click', closeInput);
}


function registerNewBoard() {
    let boardName = document.getElementById('new-board-name').value;
    let boardType;

    if (document.getElementById('private-checkbox') !== null)
    {
        boardType = document.getElementById('private-checkbox').checked ? 'private' : 'public';
    }
    else
    {
        boardType = 'public';
    }

    sendBoardDataToServer(boardName, boardType);
    closeInput();
}


function closeInput()
{
    document.getElementById('new-board-input').hidden = true;
    document.getElementById('add-board').disabled = false;
}


function sendBoardDataToServer(boardName, boardType)
{
    const url = '/board';
    const userInput = {boardName: boardName, boardType: boardType};

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.attempt === 'successful')
        {
            reloadPage()
        }
    });
}


function reloadPage()
{
    fetch('/')
        .then((response) => response.text())
        .then((response) => switchContent(response))
}


function switchContent(response)
{
    let fakeDiv = document.createElement('div');
    fakeDiv.innerHTML = response;
    let newBoardsSpace = fakeDiv.getElementsByClassName('boards-space')[0];
    let oldBoardsSpace = document.getElementsByClassName('boards-space')[0];
    oldBoardsSpace.parentElement.replaceChild(newBoardsSpace, oldBoardsSpace);
    makeCardsDragAndDroppable();
    buttonPress();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const buttonPress = () => {
    const btnClasses = document.getElementsByClassName('newColumnBtn');
    for (let btnClass of btnClasses) {
        btnClass.addEventListener('click', createInputForNewColumn);
    }
};


function newColumn() {
    let columnName = document.getElementById('new-column-name');
    let getColumName = columnName.value;
    sendColumnDataToServer(columnName()
}


const createNewColumn = () => {
    let newColumnDiv = document.createElement('div').className = 'input-column-name';
    let inputColumnName = document.createElement('input').id = 'new-column-name';
    let input = '';
    inputColumnName.setAttribute("value", input);
    let newColumn = document.createTextNode(input);
    let addNewColumnButton = document.createElement('button').id = 'column_name';
};


function sendColumnDataToServer(columnName, ) {
    const url = '/column';
    const userInput = {columnName: columnName, };
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.attempt === 'successful') {
            reloadPage()
        }
    });
}

init();