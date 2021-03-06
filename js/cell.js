'use strict'

// ALT SHIFT F DAHUF

function cellCliked(elBtn, i, j) {
    if (gGame.shownCount === 0 && gGame.markedCount === 0 && !gGame.isOn) {
        startTimer();
        gGame.isOn = true;
    }

    if (gBoard[i][j].isShown === true || gGame.isOn === false || gBoard[i][j].isMarked === true) return
    // should be checked when etering the function
    if (gBoard[i][j].isMine === true) {
        elBtn.style.backgroundColor = 'red'
        gGame.shownCount += 1
        printMines();
        gameOver(LOSE);
    } else {
        gGame.shownCount += 1
        gBoard[i][j].isShown = true;
        elBtn.style.backgroundColor = 'rgb(185, 185, 185)'
        var neg = checkNegs(i, j, elBtn);
        elBtn.innerHTML = MINENUM[neg];
        if (neg === 0) openEmptyCells(i, j, elBtn);
        if (gGame.shownCount === gNumCellToShow && gGame.markedCount === gLevel.mine) gameOver(WIN);
    }
}

function checkNegs(cellI, cellJ, isEmpty = false) {
    var counter = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gLevel.size) continue;
            if (gBoard[i][j].isMine) counter++;
        }
    }
    return counter
}


function openEmptyCells(cellI, cellJ, elBtn) {
    console.log('elBtn:', elBtn);
    
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gLevel.size) continue;
            if (gBoard[i][j].isMine || gBoard[i][j].isShown || gBoard[i][j].isMarked) continue;
            var negsCell = checkNegs(i, j, elBtn);
            var cellid = getClassName(gBoard[i][j].location)
            var elCell = document.querySelector(`.${cellid}`)
            elCell.innerText = MINENUM[negsCell];
            gGame.shownCount += 1
            gBoard[i][j].isShown = true;
            elCell.style.backgroundColor = 'rgb(185, 185, 185)'
            if (negsCell === 0) openEmptyCells(i, j, elBtn);
        }
    }
}


function cellRightClick(elBtn, cellI, cellJ) {
    var elMines = document.querySelector('.mines')
    if (gGame.shownCount === 0 && gGame.markedCount === 0 && gGame.isOn === false) {
        startTimer();
        gGame.isOn = true;
    }
    if (gBoard[cellI][cellJ].isShown === true || gGame.isOn === false) return;
    // also check at the start
    if (gBoard[cellI][cellJ].isMarked === true) {
        elBtn.innerHTML = ' ';
        gBoard[cellI][cellJ].isMarked = false
        gGame.markedCount -= 1;
        elMines.innerText = `${gLevel.mine - gGame.markedCount}` // not a good use of ggame status
    } else {
        elBtn.innerHTML = FLAG;
        gBoard[cellI][cellJ].isMarked = true;
        gGame.markedCount += 1;
        elMines.innerText = `${gLevel.mine - gGame.markedCount}`
    }
    if (gGame.shownCount === gNumCellToShow && gGame.markedCount === gLevel.mine) gameOver(WIN);
}


function printMines() {
    var strHTML;
    var st = document.querySelector('.board')
    var str = getClassName(gBoard[1][1].location)
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                var cellidx = '.' + getClassName(gBoard[i][j].location)
                strHTML = document.querySelector(cellidx);
                strHTML.innerHTML = MINE;
            }
        }
    }
}

function safeClick(){
    if(!gGame.isOn) return
    var safeCells = []
    for(var i=0;i<gLevel.size; i++){
        for(var j=0;j<gLevel.size;j++){
            if (gBoard[i][j].isMarked || gBoard[i][j].isShown || gBoard[i][j].isMine) continue
            safeCells.push(gBoard[i][j])
        }
    }
    if(safeCells.length<1) return
    var safeCell = drawNum(safeCells)
    console.log('safeCell:', safeCell);
    var cellId = getClassName(safeCell.location)
    var elCell = document.querySelector(`.${cellId}`)
    cellCliked(elCell,safeCell.location.i,safeCell.location.j)
}


