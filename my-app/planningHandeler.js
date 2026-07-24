document.addEventListener("DOMContentLoaded", (event) => {
    loaded();
});

function loaded() {
    loadData();
}

const planningBoards = [];

const boardPlaceHolder = {
    boardName: "",
    items: [
        {
            itemName: "",
            textDescription: ""
        }
    ]
};

const itemPlaceHolder = {
    itemName: "",
    textDescription: ""
}

let planningTitle = "";
let maxCards = 10;
let addedBoard = 0;
let boardN = 0;
let addedCard = [0, 0, 0, 0, 0];
let Opened = [false, false, false, false, false];

async function loadData() {
    addedBoard = 0;
    addedCard = [0, 0, 0, 0, 0];
    Opened = [false, false, false, false, false];

    const response = await fetch("BoardSaving.json");
    const data = await response.json();

    LoadBoards(data);
}
function AddBoard() {
    if (addedBoard < 5) {
        addedBoard++;

        let template = document.getElementsByClassName("placeholderBoard1")[0];
        let addBoard = document.getElementsByClassName("AddBoard");

        let copy = template.cloneNode(true);
        let copyBoard = addBoard[0].cloneNode(true);

        copy.style.display = "block";
        copy.classList.remove("placeholderBoard1");
        copy.classList.add("board" + addedBoard);

        copy.querySelector(".addCard")
            .setAttribute("onclick", `AddCard(${addedBoard - 1})`);

        copy.querySelector(".EditBoard")
            .setAttribute("onclick", `EditBoard(${addedBoard - 1}, false)`);

        document.querySelector(".BoardsContainer").appendChild(copy);
        document.querySelector(".BoardsContainer").appendChild(copyBoard);

        addBoard[0].remove();

        if (addedBoard == 5) {

        addBoard[0].remove();
        }
    }
}

function AddCard(boardNumber) {
    let board = document.getElementsByClassName("board" + (boardNumber + 1))[0];

    let itemTemplate = document.getElementsByClassName("ItemB")[0];
    let addCardTemplate = board.querySelector(".DivAddCard");

    let newItem = itemTemplate.cloneNode(true);

    newItem.querySelector(".TitleItem").value = "";
    newItem.querySelector(".TextItem").value = "";

    newItem.querySelector(".garbageIcon").style.display = Opened[boardNumber] ? "block" : "none";

    board.insertBefore(newItem, addCardTemplate);

    addedCard[boardNumber]++;

    if (addedCard[boardNumber] >= maxCards) {
        addCardTemplate.getElementsByClassName("addCard")[0].style.display = "none";
    }

    board.scrollTop = board.scrollHeight;
}

function RemoveCard(btn) {
    btn.parentNode.parentNode.removeChild(btn.parentNode);

    addedCard.splice(boardN, 1, addedCard[boardN] - 1);

    if (addedCard[boardN] < 10) {
        document.getElementsByClassName("addCard")[boardN + 1].style.display = "block";
    }

    if (addedCard[boardN] == 0) {
        EditBoard(boardN, true);
    }
}

function EditBoard(boardNumber, bool) {
    if (addedCard[boardNumber] != 0 || bool) {
        Opened.forEach((ignore, i) => {
            if (i !== boardNumber) {
                Opened[i] = false;
                let otherBoard = document.getElementsByClassName("board" + (i + 1))[0];
                if (otherBoard) {
                    otherBoard.querySelectorAll(".garbageIcon").forEach((item) => {
                        item.style.display = "none";
                    });
                }
            }
        });

        Opened[boardNumber] = !Opened[boardNumber];
        let board = document.getElementsByClassName("board" + (boardNumber + 1))[0];
        let items = board.querySelectorAll(".garbageIcon");
        boardN = boardNumber;

        items.forEach((item) => {
            item.style.display = Opened[boardNumber] ? "block" : "none";
        });
    }
}

function LoadBoards(data) {
    document.getElementById("TitleBoard").value = data.title || "";

    data.boards.forEach((boardData, index) => {
        AddBoard();

        let board = document.getElementsByClassName("board" + (index + 1))[0];

        board.querySelector(".titleB").value = boardData.boardName;

        let firstCard = board.querySelector(".ItemB");
        if (firstCard) {
            firstCard.remove();
            addedCard[index]--;
        }

        boardData.items.forEach((item) => {
            AddCard(index);

            let cards = board.querySelectorAll(".ItemB");
            let lastCard = cards[cards.length - 1];

            lastCard.querySelector(".TitleItem").value = item.itemName;
            lastCard.querySelector(".TextItem").value = item.textDescription;
        });
    });
}

function UpdateData() {
    planningBoards.length = 0;

    planningTitle = document.getElementById("TitleBoard").value;

    for (let i = 0; i < addedBoard; i++) {
        let board = document.getElementsByClassName("board" + (i + 1))[0];
        if (!board) continue;

        let boardNameInput = board.querySelector(".titleB");
        let boardName = boardNameInput ? boardNameInput.value : "";

        let items = [];

        board.querySelectorAll(".ItemB").forEach((card) => {
            let nameInput = card.querySelector(".TitleItem");
            let descInput = card.querySelector(".TextItem");

            items.push({
                itemName: nameInput ? nameInput.value : "",
                textDescription: descInput ? descInput.value : ""
            });
        });

        planningBoards.push({
            boardName: boardName,
            items: items
        });
    }
    window.planningBoards = planningBoards;

    return {
        title: document.getElementById("TitleBoard").value,
        boards: planningBoards
    };
}

async function SaveBoards() {
    const data = UpdateData();

    await window.electronAPI.saveBoards(data);

    console.log("Saved");
}