const answerDiv = document.getElementById('answer');
const infoDiv = document.getElementById('info');
const words = [
    'javascript',
    'java',
    'mokney',
    'abc'
];
const draws = [
    'gallows',
    'head',
    'body',
    'rightHarm',
    'leftHarm',
    'rightLeg',
    'leftLeg',
    'rightFoot',
    'leftFoot',
]
const maxErrors = draws.length;
const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");
const MAX_ITERATION_COUNT = 10;
let word, answerArray, guessedLetters, remainingLetters, errors;

function randomInt(max) {
    return Math.floor(Math.random() * max)
}

function initAnswerArray(length) {
    return new Array(length).fill('_');
}

function updateBoard() {
    answerDiv.innerText = answerArray.join(' ');
    infoDiv.innerText = `remain: ${remainingLetters} errors: ${errors}`
}

function resetGame() {
    let oldWord = word;
    let counter = 0;
    while (oldWord === word && counter++ < MAX_ITERATION_COUNT) {
        word = words[randomInt(words.length)];
    }
    answerArray = initAnswerArray(word.length);
    guessedLetters = [];
    remainingLetters = word.length;
    errors = 0;
    clearCanvas();
}

function indexesOfLetter(arr, letter) {
    const indexes = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === letter) {
            indexes.push(i);
        }
    }
    return indexes;
}

function unHideLetters(indexes) {
    for (let i = 0; i < indexes.length; i++) {
        answerArray[indexes[i]] = word[indexes[i]];
        remainingLetters--;
    }
}

function rememberGuessedLetter(letter) {
    guessedLetters.push(letter);
}

function handleKeyPress(e) {
    const key = e.key.toLowerCase();
    const isLetter = key.length === 1 && (key >= 'a' && key <= 'z');
    console.log('key: %s', key);
    if (!isLetter) {
        return;
    }

    if (guessedLetters.indexOf(key) === -1) {
        const indexes = indexesOfLetter(word, key);
        let error = indexes.length === 0;
        if (error) {
            drawHangMan(draws[errors++]);
            updateBoard();
        } else {
            unHideLetters(indexes);
            updateBoard();
            rememberGuessedLetter(key);
        }
    }

    if (isGameOver()) {
        const win = remainingLetters === 0 && errors < maxErrors;
        const text = win ? 'You win! :)' : 'You lose! :(';
        if (confirm(text + '\nAgain?')) {
            resetGame();
            updateBoard();
        }

    }
}

function isGameOver() {
    return errors >= maxErrors || remainingLetters === 0;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawHangMan(part) {
    switch (part) {
        case 'gallows':
            context.strokeStyle = '#888';
            context.lineWidth = 10;
            context.beginPath();
            context.moveTo(175, 225);
            context.lineTo(5, 225);
            context.moveTo(40, 225);
            context.lineTo(25, 5);
            context.lineTo(100, 5);
            context.lineTo(100, 25);
            context.stroke();
            break;

        case 'head':
            context.lineWidth = 5;
            context.beginPath();
            context.arc(100, 50, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            break;

        case 'body':
            context.beginPath();
            context.moveTo(100, 75);
            context.lineTo(100, 140);
            context.stroke();
            break;

        case 'rightHarm':
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(60, 100);
            context.stroke();
            break;

        case 'leftHarm':
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(140, 100);
            context.stroke();
            break;

        case 'rightLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(80, 190);
            context.stroke();
            break;

        case 'rightFoot':
            context.beginPath();
            context.moveTo(82, 190);
            context.lineTo(70, 185);
            context.stroke();
            break;

        case 'leftLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(125, 190);
            context.stroke();
            break;

        case 'leftFoot':
            context.beginPath();
            context.moveTo(122, 190);
            context.lineTo(135, 185);
            context.stroke();
            break;
    }
}

window.addEventListener('keydown', handleKeyPress, false);
resetGame();
updateBoard();