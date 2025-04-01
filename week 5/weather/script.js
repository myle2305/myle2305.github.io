function checkWeather() {
  const myTemp = document.querySelector("#myTemp");
  console.log(myTemp.value);
  const outer = document.querySelector("body");
  const body = document.querySelector("body");

  if (myTemp.value < 10) {
    console.log("it is freezing");
    body.style.backgroundColor = "gray";
    outer.style.backgroundColor = "darkgreen";
  } else if (myTemp.value >= 10 && myTemp.value < 20) {
    console.log("it is a pleasant weather");
    body.style.backgroundColor = "pink";
    outer.style.backgroundColor = "hotpink";
  } else if (myTemp.value >= 20 && myTemp.value < 30) {
    console.log("it is nice and sunny");
    body.style.backgroundColor = "red";
    outer.style.backgroundColor = "blue";
  } else if (myTemp.value >= 30) {
    console.log("it is burning hot");
    body.style.backgroundColor = "blue";
    outer.style.backgroundColor = "brown";
  }
}
