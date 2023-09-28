class Board {
    constructor(boardElement) {
        this.board = boardElement;
        this.cells = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.currentPlayer = 'X';
    }

    initCells() {
        this.board.innerHTML = '';

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellElement = `<div class="cell" data-row=${row} data-col=${col}>${this.cells[row][col]}</div>`

                boardElement.insertAdjacentHTML('beforeend', cellElement);
            }
        }

        // Вешаем обработчик на каждую клетку
        this.board.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);

                boardInstance.makeMove(row, col);
            });
        });

        // Показываем текущего игрока на странице
        document.querySelector('.current-player')
            .textContent = `Текущий игрок: ${this.currentPlayer}`;
    }

    makeMove(row, col) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        console.log(cell);

        // Совершаем ход, если клетка пустая
        if (!cell.textContent) {
            cell.textContent = this.currentPlayer;
            this.cells[row][col] = this.currentPlayer;

            // Проверка на победителя
            if (this.checkWinner()) {
                // alert(`Игрок ${this.currentPlayer} победил!`);
                if (confirm(`Игрок ${this.currentPlayer} победил! Начать новую игру?`)) {
                    this.restartGame();
                }

                return;
            }

            // Проверка на ничью
            if (this.checkDraw()) {
                // alert('Ничья!');
                if (confirm(`Ничья! Начать новую игру?`)) {
                    this.restartGame();
                }

                return;
            }


            // Меняем игрока
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

            // Показываем текущего игрока на странице
            document.querySelector('.current-player')
                .textContent = `Текущий игрок: ${this.currentPlayer}`;
        }
    }

    checkWinner() {
        // Выигрышные комбинации, по которым будет происходить проверка на победителя
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const combination of winningCombinations) {
            // Достаем комбинацию
            const [a, b, c] = combination;
            // Достаем координаты комбинации
            const [rowA, colA] = a;
            const [rowB, colB] = b;
            const [rowC, colC] = c;

            // Сверяем их с текущим состоянием игры
            if (this.cells[rowA][colA] === this.currentPlayer
                && this.cells[rowB][colB] === this.currentPlayer
                && this.cells[rowC][colC] === this.currentPlayer) {
                return true;
            }
        }

        return false;
    }

    checkDraw() {
        for (const row of this.cells) {
            for (const cell of row) {
                if (cell === '') {
                    // Если есть пустая клетка, значит игра не закончена
                    return false;
                }
            }
        }

        return true;
    }

    restartGame() {
        this.cells = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.currentPlayer = 'X';
        this.isFirstMove = true;
        this.initCells();

        // Показываем текущего игрока на странице
        document.querySelector('.current-player')
            .textContent = `Текущий игрок: ${this.currentPlayer}`;
    }

    // Методы для сохранения прогресса игры в localstorage
    saveGame() {
        const gameState = {
            cells: this.cells,
            currentPlayer: this.currentPlayer
        };
        localStorage.setItem('XO-game-state', JSON.stringify(gameState));

        alert('Прогресс игры сохранен!');
    }

    loadGame() {
        const gameState = JSON.parse(localStorage.getItem('XO-game-state'));
        if (gameState) {
            this.cells = gameState.cells;
            this.currentPlayer = gameState.currentPlayer;
            this.initCells();
        } else {
            alert('Нет сохраненного прогресса игры!');
        }
    }
}