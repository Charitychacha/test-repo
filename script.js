document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const resultScreen = document.getElementById('result-screen');
    const resultText = document.getElementById('result-text');
    const newGameBtn = document.getElementById('new-game-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellIndex = cell.getAttribute('data-cell-index');

            if (gameBoard[cellIndex] === '' && gameActive) {
                gameBoard[cellIndex] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer);

                if (checkWinner()) {
                    showResult(`${currentPlayer} wins!`);
                } else if (gameBoard.every(cell => cell !== '')) {
                    showResult('It\'s a draw!');
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    newGameBtn.addEventListener('click', () => {
        resetGame();
        resultScreen.style.display = 'none';
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function showResult(message) {
        resultText.textContent = message;
        resultScreen.style.display = 'block';
        gameActive = false;
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });

        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
    }
});
