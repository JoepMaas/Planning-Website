document.addEventListener("DOMContentLoaded", (event) => {
    loaded()
});

var Button1;
let text;
let OptionBlock;
let BlockVisible;
let blockType;
let block;


function loaded() {
    Button1 = document.getElementById("Button1");
    text = document.getElementById("textting");
    OptionBlock = document.getElementById("OptionBlock")
    block = document.getElementById("Block");
}

function button(blockThing) {
    blockType = blockThing;
    OptionBlock.style.visibility = "Visible";
};

function Confirm() {
    //ADD THE BUILDING BLOCK

    let div = document.getElementsByClassName("BuildingBlock")[0];
    let copy = div.cloneNode(true);

    if (document.getElementById("TitleInput").value.length < 20 && document.getElementById("TitleInput").value.length != 0) { // needs input, also less than 20 characters
        document.getElementsByClassName(blockType)[0].appendChild(copy);

        copy.getElementsByClassName('Title')[0].innerHTML = document.getElementById("TitleInput").value;
        copy.style.visibility = "Visible";
        OptionBlock.style.visibility = "Hidden";
        document.getElementsByClassName(blockType)[0].style.visibility = "Visible";
    }
    else {
        document.getElementById("TitleInput").value = "Incorrect Input, Try again."
    }
    
}