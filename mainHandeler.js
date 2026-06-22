document.addEventListener("DOMContentLoaded", (event) => {
    UpdateSelected(1);
});

const welcomeText = document.getElementById("WelcomeTitle");
const HomeTab = document.getElementById("HomeTab");
const BoardsTab = document.getElementById("BoardsTab");

let chosenTab = 1;
let user = "Joep";
let underlinePos = ["2.5", "10.2", "18.1", "25.7"];

const tabs = [
    HomeTab,
    BoardsTab
]

welcomeText.innerText = "Good to see you again, " + user + "!";

// Topbar update/navigation

function UpdateSelected (selected) {
    for (i = 1; i < document.getElementsByClassName("Underline").length; i++) {
        document.getElementsByClassName("Underline")[i].remove();
    }
    
    let underline = document.getElementsByClassName("Underline")[0];
    let copy = underline.cloneNode(true);
    document.getElementsByClassName("TopBar")[0].appendChild(copy);  
    underline.style.visibility = "Hidden";
    copy.style.visibility = "Visible";

    if (selected == 0) {     
        copy.style.marginLeft = underlinePos[0] + "vw";
    }
    else if (selected == 1) {     
        copy.style.marginLeft = underlinePos[1] + "vw";
    }
    else if (selected == 2) {     
        copy.style.marginLeft = underlinePos[2] + "vw";
    }
    else if (selected == 3) {     
        copy.style.marginLeft = underlinePos[3] + "vw";
    }

    UpdateSpace(selected);
}

function UpdateSpace (RoomN) {
    for (i = 0; i < tabs.length; i++) {
        tabs[i].style.display = RoomN == i ? "block" : "none";
    }
}

//Input Checker/keybinds

document.addEventListener('keydown', function(event) {
    if (event.target.matches('input, textarea') ||event.target.isContentEditable) 
    {
        return;
    }

    if (event.key == "d") {
        chosenTab++;
        if (chosenTab > 3)
        {
            chosenTab = 0;
        }
    }
    else if (event.key == "a") {
        chosenTab--;
        if (chosenTab < 0)
        {
            chosenTab = 3;
        }
    }
    
    UpdateSelected(chosenTab);
})
