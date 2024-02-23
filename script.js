document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const size = 4;
    let board = [];
    let currentScore = 0;
    const currentScoreElem = document.getElementById
    ('current-score');

    // Get the high score from local storage or set it to 0 if not found
    let highScore = localStorage.getItem
    ('2048-highScore') || 0;
    const highScoreElem = document.getElementById
    ('high-score');
    highScoreElem.textContent = highScore;

    const gameOverElem = document.getElementById
    ('game-over');

    //Function to update the score
    function updateScore(value){
        currentScore += value;
        currentScoreElem.textContent = currentScore;
        if (currentScore > highScore){
            highScore = currentScore;
            highScoreElem.textContent = highScore;
            localStorage.setItem('2048-highScore', 
            highScore);
        }
    }

    // Function to restart the game
    function restartGame(){
        currentScore = 0;
        currentScoreElem.textContent = '0';
        gameOverElem.style.display = 'none';
        initializeGame();
    }

    //Function to initialize the game
    function initializeGame(){
        board = [...Array(size)].map(e => Array(size).fill(0));
        placeRandom();
        placeRandom();
        renderBoard();
    }

    // Function to render the game board on the UI
    function renderBoard(){
        for (let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                const cell = document.querySelector('[data-row="${i}"][data-col="${j}"]');
                const prevValue = cell.dataset.value;
                const currentValue = board[i][j];
                if(currentValue !== 0){
                    cell.dataset.value = currentValue;
                    cell.textContent = currentValue;
                    // Animation handling
                    if(currentValue !== parseInt(prevValue) && !cell.classList.contains('new-tile')){
                        cell.classList.add('merged-tile');
                    }
                } else{
                    cell.textContent = '';
                    delete cell.dataset.value;
                    cell.classList.remove('merged-tile', 'new-tile');
                }
            }
        }

        // Cleanup animation classes
        setTimeout(() =>{
            const cells = document.querySelectorAll('grid-cell');
            cells.forEach(cell =>{
                cell.classList.remove('merged-tile', 'new-tile');
            });
        }, 300);
    }
})