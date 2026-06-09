document.addEventListener("DOMContentLoaded", (event) => {
    loaded()
});

var Button1;
let text;
let OptionBlock;
let BlockVisible;
let blockType;
let block;
let Titlecolor;
let DivBackgroundColor;


function loaded() {
    Button1 = document.getElementById("Button1");
    text = document.getElementById("textting");
    OptionBlock = document.getElementById("OptionBlock")
    block = document.getElementById("Block");
    Titlecolor = document.getElementById("TitleColor")
    DivBackgroundColor = document.getElementById("BackgroundColor");
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
        
        let Title = copy.getElementsByClassName('Title')[0];
        Title.innerHTML = document.getElementById("TitleInput").value;
        Title.style.color = Titlecolor.value;

        copy.style.backgroundColor = DivBackgroundColor.value;
      
        copy.style.visibility = "Visible";
        OptionBlock.style.visibility = "Hidden";
        document.getElementsByClassName(blockType)[0].style.visibility = "Visible";
    }
    else {
        document.getElementById("TitleInput").value = "Incorrect Input, Try again."
    }
    
}
