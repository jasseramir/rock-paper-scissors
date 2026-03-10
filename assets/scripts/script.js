const scoreEl = document.getElementById('score');
const chooseBox = document.getElementById('choose');
const choicesBox = document.getElementById('choices');
const btns = document.querySelectorAll('.choice');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const rulesBtn = document.getElementById('rulesBtn');
const rulesBox = document.getElementById('rulesBox');
const rulesClose = document.getElementById('closeBtn');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');

const winningMap = {
    scissors: 'paper',
    rock: 'scissors',
    paper: 'rock'
};

// let score = Number(localStorage.getItem('score')) || 0;
let score = 0;
scoreEl.textContent = score;

let playerChoice = '';
let computerChoice = '';

function createChoiceElement(choiceName) {
    const choiceDiv = document.createElement('div');
    choiceDiv.className = `choice ${choiceName}`;
    
    const img = document.createElement('img');
    img.src = `./assets/images/icon-${choiceName}.svg`;
    img.alt = choiceName;
    
    choiceDiv.appendChild(img);
    return choiceDiv;
}

function showPlayerChoice(choiceName) {
    playerChoiceEl.innerHTML = '';
    const choiceElement = createChoiceElement(choiceName);
    playerChoiceEl.appendChild(choiceElement);
}

function showEmptyComputerChoice() {
    computerChoiceEl.innerHTML = '<div class="empty-choice"></div>';
}

function showComputerChoice(choiceName) {
    computerChoiceEl.innerHTML = '';
    const choiceElement = createChoiceElement(choiceName);
    computerChoiceEl.appendChild(choiceElement);
}

function getResult(player, computer) {
    if (player === computer) {
        return 'DRAW';
    }
    
    if (winningMap[player] === computer) {
        return 'WIN';
    }
    
    return 'LOSE';
}

function updateScore(result) {
    if (result === 'WIN') {
        score++;
    } else if (result === 'LOSE' && score > 0) {
        score--;
    }
    
    // localStorage.setItem('score', score);
    scoreEl.textContent = score;
}

function showResult(result) {
    // you will find winner class in result.css
    if (result === 'WIN') {
        resultText.textContent = 'YOU WIN';
        playerChoiceEl.firstElementChild.classList.add('winner');
    } else if (result === 'LOSE') {
        resultText.textContent = 'YOU LOSE';
        computerChoiceEl.firstElementChild.classList.add('winner');
    } else {
        resultText.textContent = 'DRAW';
    }
    
    resultBox.classList.add('show');
}

function clearWinners() {
    const playerPicked = playerChoiceEl.querySelector('.choice');
    const computerPicked = computerChoiceEl.querySelector('.choice');
    
    if (playerPicked) playerPicked.classList.remove('winner');
    if (computerPicked) computerPicked.classList.remove('winner');
}

function playRound(btn) {
    const keys = Object.keys(winningMap);
    
    playerChoice = btn.id;
    computerChoice = keys[Math.floor(Math.random() * keys.length)];
    
    clearWinners();
    resultBox.classList.remove('show');
    resultText.textContent = '';
    
    chooseBox.style.display = 'none';
    choicesBox.style.display = 'block';
    
    showPlayerChoice(playerChoice);
    showEmptyComputerChoice();
    
    setTimeout(() => {
        showComputerChoice(computerChoice);
        
        const result = getResult(playerChoice, computerChoice);
        updateScore(result);
        
        setTimeout(() => {
            showResult(result);
        }, 400);
    }, 1000);
}

function resetGame() {
    chooseBox.style.display = 'block';
    choicesBox.style.display = 'none';
    
    playerChoiceEl.innerHTML = '';
    computerChoiceEl.innerHTML = '<div class="empty-choice"></div>';
    resultBox.classList.remove('show');
    resultText.textContent = '';
}

btns.forEach(btn => {
    btn.addEventListener('click', () => playRound(btn));
});

playAgainBtn.addEventListener('click', resetGame);

// you will find is-visible class in rules.css
rulesBtn.addEventListener('click', () => {
    rulesBox.classList.add('is-visible');
});

rulesClose.addEventListener('click', () => {
    rulesBox.classList.remove('is-visible');
});
