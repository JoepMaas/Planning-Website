document.addEventListener("DOMContentLoaded", (event) => {
    loaded()
});

function loaded () {
    
}

let addedBoard = 0;
let addedCard = [0,0,0,0,0];

function AddBoard() {
    if (addedBoard < 4) {
        addedBoard++;
        
        let board = document.getElementsByClassName("placeholderBoard1")[0];
        let addBoard = document.getElementsByClassName("AddBoard");
        
        let copy = board.cloneNode(true);
        let copyBoard = addBoard[0].cloneNode(true);     
        
        copy.classList.remove("placeholderBoard1");
        copy.classList.add("board" + (addedBoard + 1));

        const addCardBtn = copy.querySelector('.addCard');
        addCardBtn.setAttribute('onclick', `AddCard(${addedBoard})`);

    
        document.getElementsByClassName("BoardsContainer")[0].appendChild(copy);
        document.getElementsByClassName("BoardsContainer")[0].appendChild(copyBoard);
    
        addBoard[0].remove();
    

        if (addedBoard == 4) {
            addBoard[0].style.display = "none";
        }
    }
}

function AddCard(CardN) {
    // if (addedCard < 4) {
    let item = document.getElementsByClassName("ItemB")[0];
    let addCard = document.getElementsByClassName("DivAddCard");

    let copyI = item.cloneNode(true);
    let copyC = addCard[CardN + 1].cloneNode(true);


    document.getElementsByClassName("board" + (CardN + 1))[0].appendChild(copyI);
    document.getElementsByClassName("board" + (CardN + 1))[0].appendChild(copyC);

    addCard[CardN + 1].remove();
   

    addedCard.splice(CardN, 1, addedCard[CardN] + 1);
    console.log(addedCard[CardN]);

    if (addedCard == 4 && CardN == 0) {
        document.getElementsByClassName("addCard")[(CardN + 1)].style.display = "none";
    }

 
}

