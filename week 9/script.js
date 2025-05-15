const myButton = document.querySelector("#my-button");

myButton.addEventListener("click", moveInput);

const myDuck = document.querySelector("#my-duck");
let clicked = false;

function moveInput() {
  if (!clicked) {
    myDuck.style.translate = "30px 40px";
    clicked = true;
  } else {
    myDuck.style.translate = "0px 0px";
    clicked = false;
  }
}
