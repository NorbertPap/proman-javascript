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
    boardAddingButton.addEventListener('click', createNewBoard)
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


function registerNewBoard()
{
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


function main()
{
    makeBoardAddingButtonFunctional();
    makeCardsDragAndDroppable()
}

main();