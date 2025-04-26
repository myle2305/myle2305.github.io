const myButton = document.querySelector("#my-button");
console.log(myButton);
const header = document.querySelector("header");
myButton.addEventListener("click", handleClick);
let course = "OART1013";

const myCat = document.querySelector("#my-cat");
console.log(myCat);

myCat.addEventListener("mouseenter", addMe);
myCat.addEventListener("mouseenter", removeMe);

function addMe() {
  myCat.classList.add("round");
}
function removeMe() {
  myCat.classList.remove("round");
}

function handleClick() {
  console.log("did you just click me?");
  myCat.classList.toggle("round");
  // header.innerHTML += `<h1> this is ${course} </h1>`;
}

// const header = document.querySelector("header");
// console.log(Header);
// console.log(header.innerHTML);

header.innerHTML += `<h1> this is ${course} </h1>`;
// console.log(header.innerHTML);
const topHeading = document.querySelector("h1");

const topHeading = document.querySelector("h1");
// console.log(topHeading);
// console.log(topHeading.textContent);
topHeading.textContent = "this is my new top heading";
topHeading.style.color = "red";

const allParas = document.querySelectorAll("p");
// console.log(allParas);
for (let i = 0; i < allParas.length; i++) {
  // console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid blue";
  allParas[i].style.backgroundColor = "beige";
}
const sh1 = document.querySelector("#first-subheading");
// console.log(sh1);
// console.log(sh1.textContent);
const sh1 = document.querySelector(".blue-color");
// console.log(blue1);
for (let i = 0; i < sh1.length; i++) {
  // console.log(sh1[i].textContent);
}
const allSubHeadings = document.querySelectorAll("h2");
// console.log(allSubHeadings);
