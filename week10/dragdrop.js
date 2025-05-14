const card = document.querySelector(".card");

let draggedCard = null;

card.addEventListener("dragstart", function () {
  draggedCard = card;
});

const dropbox = document.querySelector(".dropbox");

dropbox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropbox.addEventListener("drop", function () {
  const clone = draggedCard;
  // dropbox.innerHTML = draggedCard;
  dropbox.appendChild(clone);
  clone.addEventListener("click", function () {});
});
