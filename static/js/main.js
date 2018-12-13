// This function is to initialize the application
function init() {
    submitButton();
    loginButton();
    registerButton();
    makeCardsDragAndDroppable();
    makeBoardAddingButtonFunctional();
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
    document.getElementById('new-board-input').innerHTML = `<form class="form-inline">
                                                                <input type="text" class="form-control mb-2 mr-sm-2" id="new-board-name" placeholder="Board name">
                                                            
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="Private" id="private-radio" value="private-radio" checked>
                                                                    <label class="form-check-label" for="private-radio">
                                                                        Private
                                                                    </label>
                                                                </div>
                                                              
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="Public" id="public-radio" value="public-radio">
                                                                    <label class="form-check-label" for="public-radio">
                                                                        Public
                                                                    </label>
                                                                </div>
                                                            
                                                                <button type="button" class="btn btn-primary mb-2" id="create-board">Create</button>
                                                                
                                                                <button type="button" class="btn btn-secondary mb-2" id="cancel-board">Cancel</button>
                                                            </form>`;
    let createButton = document.getElementById('create-board');
    let cancelButton = document.getElementById('cancel-board');
    createButton.addEventListener('click', registerNewBoard);
    cancelButton.addEventListener('click', closeInput);
}


function registerNewBoard() {
    let boardName = document.getElementById('new-board-name').value;
    let boardType = document.getElementById('private-radio').checked ? 'private' : 'public';
    sendBoardDataToServer(boardName, boardType);
    closeInput();
}


function closeInput()
{
    document.getElementById('new-board-input').innerHTML = '';
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

init();