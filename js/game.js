'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍔'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gIsWin
var gCountFood
var gFoodOnBoard
var gCherryInterval

function inIt() {
    gFoodOnBoard = 0
    gCountFood = 0
    gIsWin = true
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCherryInterval = setInterval(addCherry, 15000, gBoard)

    printMat(gBoard, '.board-container')
    closeModal()
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gFoodOnBoard++

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gFoodOnBoard--
            }
            if (i === 1 && j === 1 || i === SIZE - 2 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || j == SIZE - 2 && i === 1) {
                board[i][j] = POWER_FOOD
                gFoodOnBoard--

            }
        }
    }

    console.log('gFoodOnBoard', gFoodOnBoard);
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function addCherry(board) {
    var randLocation = getEmptyCell(board)
    //MODEL    
    gBoard[randLocation.i][randLocation.j] = CHERRY
    //DOM
    renderCell(randLocation, CHERRY)
}


function gameOver(isWin) {
    console.log('isWin : ',isWin);
    // var isWin = false
    gGame.isOn = false
    showModal(isWin)
    renderCell(gPacman.location, '🪦')
    clearInterval(gCherryInterval)
    clearInterval(gIntervalGhosts)
}

// function victoryGame() {
//     var isWin = true
//     gGame.isOn = false
//     showModal(isWin)
//     renderCell(gPacman.location, '🥳')
//     clearInterval(gIntervalGhosts)
//     clearInterval(gCherryInterval)
// }


function getEmptyCell(gBoard) {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell === ' ') {
                emptyCells.push({ i, j })
            }
        }
    }
    var randFloorIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randFloorIdx]
}
