const myCards = [
  {
    id: 1,
    name: "Queen",
    src: "queen.png",
  },
  {
    id: 2,
    name: "King",
    src: "king.png",
  },
  {
    id: 3,
    name: "Jack",
    src: "jack.png",
  },
];

let cardComposition = "";

for (let i = 0; i < myCards.length; i++) {
  cardComposition += `
  <div class="card-container">
            <div class="card" draggable="true">
              <div class="card-face"><img src="cloud.png" alt="Back" /></div>
              <div class="card-face flip">
                <img src="${myCard[i].src}" alt="${myCard[i].name}" />
              </div>
            </div>
          </div>
    `;
}

const deck = document.querySelector(".deck");

deck.innerHTML = cardComposition;

let draggedCard = null;

// drag drop
const cards = document.querySelectorAll(".card");

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("dragstart", function () {
    draggedCard = cards[i];
    let cardDetail = draggedCard.querySelector(".card-front");
    console.log(cardDetail);
    console.log("you're dragging", cardDetail.alt);
  });
}

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
