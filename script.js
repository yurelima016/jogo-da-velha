let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const xIcon = '<i class="bi bi-x-lg"></i>';
const oIcon = '<i class="bi bi-circle"></i>';

let currentPlayer = "X";

const board = document.getElementById("board");

function clearBoard() {
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  document.querySelectorAll(".slots").forEach((slot) => (slot.innerHTML = ""));
  currentPlayer = "X";
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    // Linhas
    if (
      gameBoard[i][0] !== "" &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][1] === gameBoard[i][2]
    )
      return true;
    // Colunas
    if (
      gameBoard[0][i] !== "" &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i]
    )
      return true;
  }
  // Diagonais
  if (
    gameBoard[0][0] !== "" &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  )
    return true;
  if (
    gameBoard[0][2] !== "" &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  )
    return true;

  return false;
}

function checkDraw() {
  return !gameBoard.flat().includes("");
}

board.addEventListener("click", (e) => {
  const clickedSlot = e.target.closest(".slots");

  if (!clickedSlot) return;

  if (clickedSlot.children.length === 0) {
    const row = clickedSlot.getAttribute("data-row");
    const col = clickedSlot.getAttribute("data-col");

    clickedSlot.innerHTML = currentPlayer === "X" ? xIcon : oIcon;
    gameBoard[row][col] = currentPlayer;

    setTimeout(() => {
      if (checkWinner()) {
        alert(`Jogador ${currentPlayer} venceu!`);
        clearBoard();
        return;
      } else if (checkDraw()) {
        alert("Empate!");
        clearBoard();
        return;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }, 10);
  } else {
    alert("Slot já preenchido! Escolha outro.");
  }
});
