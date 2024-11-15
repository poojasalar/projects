let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
  player1Name = document.getElementById('player1').value;
  player2Name = document.getElementById('player2').value;

  if (player1Name && player2Name) {
    document.querySelector('.player-input').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    gameActive = true;
    resetGame();
  } else {
    alert('Please enter both player names');
  }
}

function makeMove(index) {
  if (!gameActive || gameBoard[index]) return;

  gameBoard[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;

  if (checkWinner()) {
    setTimeout(() => {
      alert(`${currentPlayer === 'X' ? player1Name : player2Name} wins!`);
      document.getElementById('restart-container').style.display = 'block';
    }, 100);
    gameActive = false;
  } else if (gameBoard.every(cell => cell)) {
    setTimeout(() => alert('It\'s a draw!'), 100);
    gameActive = false;
    document.getElementById('restart-container').style.display = 'block';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

function restartGame() {
  document.getElementById('restart-container').style.display = 'none';
  resetGame();
  gameActive = true; 
}
