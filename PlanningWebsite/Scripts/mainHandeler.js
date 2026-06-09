document.addEventListener("DOMContentLoaded", (event) => {
    UpdateSelected('Home');
});

const welcomeText = document.getElementById("WelcomeTitle");

let user = "Joep";
let underlinePos = ["2.5", "10.2", "18.1", "25.7"];


welcomeText.innerText = "Good to see you again, " + user + "!";

function UpdateSelected (selected) {
    for (i = 1; i < document.getElementsByClassName("Underline").length; i++) {
        document.getElementsByClassName("Underline")[i].remove();
    }

    let underline = document.getElementsByClassName("Underline")[0];
    let copy = underline.cloneNode(true);
    document.getElementsByClassName("TopBar")[0].appendChild(copy);  
    underline.style.visibility = "Hidden";
    copy.style.visibility = "Visible";

    if (selected == "Home") {     
        copy.style.marginLeft = underlinePos[0] + "vw";
    }
    else if (selected == "Boards") {     
        copy.style.marginLeft = underlinePos[1] + "vw";
    }
    else if (selected == "Calender") {     
        copy.style.marginLeft = underlinePos[2] + "vw";
    }
    else if (selected == "Settings") {     
        copy.style.marginLeft = underlinePos[3] + "vw";
    }
    
}