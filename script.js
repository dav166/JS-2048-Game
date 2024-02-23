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
})