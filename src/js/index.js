const boardElement = document.querySelector('.board');
const currentPlayer = document.querySelector('.current-player');

// Создаем экземпляр поля для игры
const boardInstance = new Board(boardElement);

document.addEventListener('DOMContentLoaded', () => {
    // Отрисовываем клетки
    boardInstance.initCells();

    // Указываем текущего игрока
    currentPlayer.textContent = `Текущий игрок: ${boardInstance.currentPlayer}`;

    // Обработчик для рестарта игры
    document.querySelector('.btn-restart-game').addEventListener('click', () => {
       boardInstance.restartGame();
    });

    // Обработчик для сохранения текущего прогресса игры
    document.querySelector('.btn-save-game').addEventListener('click', () => {
        boardInstance.saveGame();
    });

    // Обработчик для загрузки игры
    document.querySelector('.btn-load-game').addEventListener('click', () => {
        boardInstance.loadGame();
    });

});
