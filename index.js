const fs = require('fs').promises;

const newBoard = {
    boardName: "To fuck",
    items: [
        {
            itemName: "Item Naam",
            textDescription: "Fuck scheikunde",
        },
        {
            itemName: "Piemel",
            textDescription: "Erectie stoornis"
        }
    ]
};

async function addBoard() {
    try {
        let data;
        try {
            const jsonString = await fs.readFile("./BoardSaving.json", "utf-8");
            data = JSON.parse(jsonString);
        } catch {
            // File doesn't exist, start fresh
            data = { Boards: [] };
        }

        // If Boards array is missing from the file, create it
        if (!data.boards) {
            data.boards = [];
        }

        data.boards.push(newBoard);

        await fs.writeFile("./BoardSaving.json", JSON.stringify(data, null, 2));
        console.log("Board added!", data);
    } catch (err) {
        console.log("Something went wrong:", err);
    }
}

async function deleteBoard(boardName) {
    try {
        const jsonString = await fs.readFile("./BoardSaving.json", "utf-8");
        const data = JSON.parse(jsonString);

        const boardExists = data.boards.some(board => board.boardName === boardName);
        if (!boardExists) {
            console.log(`Board "${boardName}" not found`);
            return;
        }

        // Remove the board with the matching name
        data.boards = data.boards.filter(board => board.boardName !== boardName);

        await fs.writeFile("./BoardSaving.json", JSON.stringify(data, null, 2));
        console.log(`Board "${boardName}" deleted!`, data);
    } catch (err) {
        console.log("Something went wrong:", err);
    }
}


//addBoard();
deleteBoard("To fuck");
