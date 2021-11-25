'use strict'


function buildBoard(size, mine) {
    var board = [];
    var mines = getRandomMineLocations(size, mine);

    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i].push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                location: {
                    i: i,
                    j: j
                }
            })
            for (var s = 0; s < mines.length; s++) {
                var currmine = mines[s]
                if (currmine[0] === i && currmine[1] === j) {
                    board[i][j].isMine = true;
                }
            }
        }
    }
    return board;
} // bild board (row = col = size)


function printMat(mat) {
    var strHTML = '';
    for (var i = 0; i < mat.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < mat[0].length; j++) {
            var className = `cell cell-${i}-${j}`;
            strHTML += `<td onclick="cellCliked(this,${i},${j})" oncontextmenu="cellRightClick(this,${i},${j})" class="${className}"> ${EMPTY} </td>`
        }
        strHTML += `</tr>`
    }
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
} // print the table with the selector you want inside


// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
} // Select the elCell and set the value


function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}


function startTimer() {
    gStartTime = Date.now();
    gPlayTime = setInterval(() => {
        var elTimer = document.querySelector('.timer')
        var milisecs = Date.now() - gStartTime
        elTimer.innerHTML = `Timer: ${(milisecs / 1000).toFixed(3)}`
    }, 10)
}


function getRandomMineLocations(maxNum, numOfIdx) {
    var mineLoc = [];
    var tempMinesLoc = []
    for (var i = 0; i < maxNum; i++) {
        for (var j = 0; j < maxNum; j++) {
            var randLoc = [i, j];
            tempMinesLoc.push(randLoc);
        }
    }
    for (var s = 0; s < numOfIdx; s++) {
        mineLoc.push(drawNum(tempMinesLoc));
    }
    return mineLoc;
}
















function shuffleArray(arr) {
    var len = arr.length
    var arrNums = [];
    for (var i = 0; i < len; i++) {
        arrNums.push(drawNum(arr));
    }
    return arrNums;
} // Make shuffle to array


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} // Return random number min <--> max-1


function drawNum(nums) {
    var idx = getRandomInt(0, nums.length)
    var num = nums[idx]
    nums.splice(idx, 1)
    return num
} // Doing random splice on array


function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[(Math.random() * 16)];
    }
    return color;
} // Return random color


function getWord() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var num = getRandomInt(3, 6);
    var str = '';
    for (var i = 0; i < num; i++) {
        var alphabetIndex = getRandomInt(0, alphabet.length)
        str += alphabet.charAt(alphabetIndex);
    }
    return str;
} // Return one words with 3-5 random letters


function getLoremIpsum(wordsCount) {
    var lorem = '';
    for (var i = 0; i < wordsCount; i++) {
        lorem += getWord();
        if (i < wordsCount) lorem += ' ';
    }
    return lorem;
} // Return Random sentence with random words 
