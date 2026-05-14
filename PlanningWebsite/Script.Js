document.addEventListener("DOMContentLoaded", (event) => {
    loaded()
});
var Button1;
let text;

function loaded() {
    Button1 = document.getElementById("Button1");
    text = document.getElementById("textting");
}

function button() {
    text.innerText = "dsa";
};