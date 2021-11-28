'use strict'
const MINE = '💣';
const FLAG = '🚩';
const NORMAL = '😀';
const LOSE = '🤯'
const WIN = '😎'
const EMPTY = ' ';
const MINENUM = [' ', '1', '2', '3', '4', '5', '6', '7', '8']; // why you need this array???

var gBoard;
var gLevel = {
    size: 4,
    mine: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gStartTime;
var gPlayTime;
var gNumCellToShow; // not a good name


function init() {
    var elMines = document.querySelector('.mines')
    elMines.innerText = `${gLevel.mine}`; 
    gNumCellToShow = gLevel.size ** 2 - gLevel.mine;
    gBoard = buildBoard(gLevel.size, gLevel.mine);
    printMat(gBoard);
}

function setLevel(lvl) {
    var strHTML = lvl.innerHTML
    if (strHTML === 'Beginner') {
        gLevel.size = 4;
        gLevel.mine = 2;
    }
    if (strHTML === 'Medium') {
        gLevel.size = 8;
        gLevel.mine = 12;
    }
    if (strHTML === 'Expert') {
        gLevel.size = 12;
        gLevel.mine = 30;
    }
    restGame();
}


function gameOver(status) { // status should be boolean, you shoud not use an emoji to determine what is your game status
    gGame.isOn = false;
    clearInterval(gPlayTime);
    var strHTML = document.querySelector('.rest')
    if (status === LOSE) {
        strHTML.innerHTML = LOSE;
    }
    if (status === WIN) {
        strHTML.innerHTML = WIN;
    }
}

function restGame() {
    gGame.isOn = false;
    clearInterval(gPlayTime);
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gStartTime = 0;
    gPlayTime = 0;
    gNumCellToShow = 0;
    var elTimer = document.querySelector('.timer');
    var strHTML = document.querySelector('.rest');
    strHTML.innerHTML = NORMAL;
    elTimer.innerHTML = 'Timer: 0.000';
    init(); // using init and re resting some vars
}

