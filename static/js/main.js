
function makeCardsDragAndDroppable() {
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


function sendColumnDataToServer(columnName, columnType) {
    const url = '/column';
    const userInput = {columnName: columnName, columnType: columnType};
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


function reloadPage() {
    fetch('/')
        .then((response) => response.text())
        .then((response) => switchContent(response))
}


const switchContent = (response) => {
    let fakeDiv = document.createElement('div');
    fakeDiv.innerHTML = response;
    let newColumnSpace = fakeDiv.getElementsByClassName('column-space')[0];
    let oldColumnSpace = document.getElementsByClassName('column-space')[0];
    oldColumnSpace.parentElement.replaceChild(newColumnSpace, oldColumnSpace);
    makeCardsDragAndDroppable();
};


const buttonPress = () => {
    const btnClasses = document.getElementsByClassName('newColumnBtn');
    for (let btnClass of btnClasses) {
        btnClass.addEventListener('click', createInputForNewColumn);
    }
};


function newColumn() {

}

function createInputForNewColumn(event) {
    console.log(event.target);
    document.getElementById('new-board-input').innerHTML = '';
    let createButton = document.createElement('button').id = 'create-column';
    let cancelButton = document.createElement('button').id = 'cancel-column';
    document.getElementById('create-column').addEventListener('click', newColumn);
    document.getElementById('cancel-column').addEventListener('click', closeInput);
}

function closeInput() {
    document.getElementById('new-board-input').innerHTML = '';
    document.getElementById('add-board').disabled = false;
}


const createNewColumn = () => {
    let newColumnDiv = document.createElement('div').className = 'input-column-name';
    let inputColumnName = document.createElement('input').id = 'new-column-name';
    let input = '';
    inputColumnName.setAttribute("value", input);
    let newColumn = document.createTextNode(input);
    let addNewColumnButton = document.createElement('button').id = 'column_name';
};

function createNewColumn() {
    let columnName = document.getElementById('new-column-name').value;
    sendColumnDataToServer(columnName);
}


const main = () => {
    makeCardsDragAndDroppable();
    buttonPress();
};

main();