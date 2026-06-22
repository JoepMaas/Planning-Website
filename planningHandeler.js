document.addEventListener("DOMContentLoaded", (event) => {
    loaded()
});

function loaded () {
    
}

let maxCards = 10;
let addedBoard = 0;
let boardN = 0;
let addedCard = [0,0,0,0,0];
let Opened = [false,false,false,false,false];

function AddBoard() {
    if (addedBoard < 4) {
        addedBoard++;
        ToggledEditMode = true;
        
        let board = document.getElementsByClassName("placeholderBoard1")[0];
        let addBoard = document.getElementsByClassName("AddBoard");
        
        let copy = board.cloneNode(true);
        let copyBoard = addBoard[0].cloneNode(true);     
        
        copy.classList.remove("placeholderBoard1");
        copy.classList.add("board" + (addedBoard + 1));

        const addCardBtn = copy.querySelector('.addCard');
        addCardBtn.setAttribute('onclick', `AddCard(${addedBoard})`);
        
        const EditBoardBtn = copy.querySelector('.EditBoard');
        EditBoardBtn.setAttribute('onclick', `EditBoard(${addedBoard, false})`);
    
        document.getElementsByClassName("BoardsContainer")[0].appendChild(copy);
        document.getElementsByClassName("BoardsContainer")[0].appendChild(copyBoard);
    
        addBoard[0].remove();
        if (addedBoard == 4) {
            addBoard[0].style.display = "none";
        }

    }
}

function AddCard(boardNumber) {
    let item = document.getElementsByClassName("ItemB")[0];
    let addCard = document.getElementsByClassName("DivAddCard");

    let copyI = item.cloneNode(true);
    let copyC = addCard[boardNumber + 1].cloneNode(true);

    let board = document.getElementsByClassName("board" + (boardNumber + 1))[0]; 
    board.appendChild(copyI);
    board.appendChild(copyC);
    
    board.scrollTop = board.scrollHeight;
    
    addCard[boardNumber + 1].remove();
    
    addedCard.splice(boardNumber, 1, addedCard[boardNumber] + 1);
    
    //hiding: + add card
    document.getElementsByClassName("addCard")[(boardNumber + 1)].style.display = (addedCard[boardNumber] == maxCards) ? "none" : "block";
    copyI.getElementsByClassName("garbageIcon")[0].style.display = (Opened[boardNumber]) ? "block" : "none"; 
}

function RemoveCard(btn){
    ((btn.parentNode).parentNode).removeChild(btn.parentNode)

    addedCard.splice(boardN, 1, (addedCard[boardN] -1));

    if (addedCard[boardN] < 10) {
        document.getElementsByClassName("addCard")[(boardN + 1)].style.display = "block";
    }

    if (addedCard[boardN] == 0)
    {
        EditBoard(boardN, true);
    }
}

function EditBoard(boardNumber, bool) {
    if (addedCard[boardNumber] != 0 || bool) {

        Opened[boardNumber] = !Opened[boardNumber];

        let board = document.getElementsByClassName("board" + (boardNumber + 1))[0];
        let items = board.querySelectorAll('.garbageIcon');
        boardN = boardNumber;

        items.forEach(item => {
            item.style.display = Opened[boardNumber] ? "block" : "none";
        });
    }
}