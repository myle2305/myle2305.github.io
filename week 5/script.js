let a = 10;
let b = 20;

function add(a, b) {
  let sum = a + b;
  // console.log(sum);
}
function whatIsMyGrade(marks) {
  if (marks < 40) {
    // console.log("sorry you failed");
    return "failed";
  } else if (marks > 80) {
    //console.log("you got HD");
    return "HD";
  } else return "pass";
}
let myMarks = 54;
let myGrade = whatIsMyGrade(myMarks);
console.log(myGrade);

let total = add(10, 20);
console.log(total);
total = add(a, b);
console.log(total);
// add(10, 20);
// add(23,05);
// let c = a + b;
// console.log(c);
// a = 23;
// b = 17;
// c = a + b;
// console.log(c);

let myName = "My";
let myID = "s12345";
let myNewName = "MELBOURNE";
let myCity = "Perth";

//number variables
let num = 10;
let num2 = parseInt("20");
let sum = num * num2;
console.log("total is", sum);

//+ for addition as well as joining text
//- for subtraction
// * for multiplication
// / division
const grade = 75;

if (grade >= 75) {
  console.log("I got Distinction");
} else {
  console.log("I just pass the course");
}

// const msg = `<h1>Today's weather is ${weather}
// <p> This is so nice to see the sun again</p>
// </h1>`;
// console.log(msg);

//boolean variables - true or false
// let isThisEvening = false;
// let isThisRMIT = true;

//object variables {}
const myStudentDetails = {
  name: "My",
  id: 1234,
  homeTown: "Melbourne",
};

let array = [2, 4, 6, 8, 10];
console.log(array[0]);
let student1 = "Rohit";
let student2 = "Roger";
console.log(student1, student2);
let studentArray = ["Rohit", "Roger", "Sarah", "Julia", "Tim"];

for (let i = 0; i < studentArray.length; i++) {
  console.log("Hello", studentArray[i]);
}

// console.log(studentArray[2]);
// console.log(studentArray[0]);

// console.log(myStudentDetails);
// console.log("my hometown is", myStudentDetails.homeTown);

// console.log("Hi");
// console.log("How are you");
// console.log("Hi, I am", myName);
// console.log("Hi, my student id is", myID);
// myName = "abcd";
// console.log("Hi, I am", myName);
// let myNewName = prompt("What is your name?");
// console.log("Hello", myNewName);
// console.log("Hello", myNewName, myCity);
// if you know the value is not going to change, define it using constant
// or else use let
