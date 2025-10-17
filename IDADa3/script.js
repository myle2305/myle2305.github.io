const starfield = document.getElementById("starfield");
const starCount = 150;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.className = "star";

  const size = 1 + Math.random() * 2;
  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = 2 + Math.random() * 3 + "s";

  starfield.appendChild(star);
}
