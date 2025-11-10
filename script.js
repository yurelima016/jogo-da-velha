let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const xIcon = '<i class="bi bi-x-lg"></i>';
const oIcon = '<i class="bi bi-circle"></i>';

let currentPlayer = "X";
const playerBadge = document.getElementById("actualPlayer");

const board = document.getElementById("board");
const blackBackground = document.getElementById("black-bg");
const popup = document.getElementById("popup");
const winnerIcon = document.getElementById("winnerIcon");
const winnerLabel = document.getElementById("winnerLabel");
const closePopupBtn = document.getElementById("close-btn");

function clearBoard() {
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  document.querySelectorAll(".slots").forEach((slot) => (slot.innerHTML = ""));
  currentPlayer = "X";
  updatePlayerBadge();
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

function showWinnerPopup(winner, result) {
  blackBackground.classList.add("active");
  popup.classList.add("active");

  if (result === "gameWon") {
    winnerIcon.innerHTML = winner === "X" ? xIcon : oIcon;
    winnerLabel.textContent = `Jogador ${winner} venceu!`;
  } else {
    winnerIcon.innerHTML = xIcon + oIcon;
    winnerLabel.textContent = `Empate!`;
  }
}

function updatePlayerBadge() {
  playerBadge.textContent = `Player ${currentPlayer}`;
  playerBadge.classList.remove("playerX", "playerO");
  if (currentPlayer === "X") {
    playerBadge.classList.add("playerX");
  } else {
    playerBadge.classList.add("playerO");
  }
}

updatePlayerBadge();

closePopupBtn.addEventListener("click", () => {
  blackBackground.classList.remove("active");
  winnerIcon.innerHTML = "";
  winnerLabel.textContent = "";
  popup.classList.remove("active");
  clearBoard();
});

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
        showWinnerPopup(currentPlayer, "gameWon");
        return;
      } else if (checkDraw()) {
        showWinnerPopup(currentPlayer, "gameDraw");
        return;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updatePlayerBadge();
      }
    }, 10);
  } else {
  }
});
