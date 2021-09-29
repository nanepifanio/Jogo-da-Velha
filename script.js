const qs = (element) => document.querySelector(element);
const qsa = (element) => document.querySelectorAll(element);

const square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};
let result = "";
let turn = "";
let playing = false;
let oPoints = 0,
  xPoints = 0;

qsa(".item").forEach((element) => {
  element.addEventListener("click", () => {
    const dataItem = element.getAttribute("data-item");
    itemClick(dataItem);
  });
});

qs(".reset").addEventListener("click", reset);

function itemClick(data) {
  if (square[data] === "" && playing) {
    square[data] = turn;
    if (turn === "X") {
      qs(`[data-item=${data}]`).classList.add("x-color");
    }
    qs(`[data-item=${data}]`).innerHTML = turn;
    checkGame();
    changeTurn();
  }
}

function checkGame() {
  if (checkWinnerFor("X")) {
    result = '"X" Wins!';
    qs(".x-points").innerHTML = `${++xPoints}`;
    playing = false;
  } else if (checkWinnerFor("O")) {
    result = '"O" Wins!';
    qs(".o-points").innerHTML = `${++oPoints}`;
    playing = false;
  } else if (squareIsFull()) {
    result = "Draw!";
    playing = false;
  }
}

function checkWinnerFor(player) {
  const pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let item of pos) {
    const pArray = item.split(",");
    const match = pArray.every((option) => square[option] === player);
    if (match) return true;
  }

  return false;
}

function squareIsFull() {
  for (let i in square) {
    if (square[i] === "") return false;
  }
  return true;
}

function changeTurn() {
  turn = turn === "X" ? "O" : "X";
  renderInfo();
}

function reset() {
  result = "";

  const random = Math.floor(Math.random() * 2);
  turn = random === 0 ? "X" : "O";

  for (let i in square) {
    square[i] = "";
  }

  qsa(".item").forEach((element) => {
    element.innerHTML = "";
    if (element.classList.contains("x-color")) {
      element.classList.remove("x-color");
    }
  });

  playing = true;

  renderInfo();
}

function renderInfo() {
  qs(".vez").innerHTML = turn;
  qs(".resultado").innerHTML = result;
}

reset();
