'use strict'

// const GHOST = '👻'
const GHOST = '&#9781;'

var gGhosts = []
var gGhostsColor = []
var gIntervalGhosts


function createGhost(board) {
    // const elGhost = document.querySelector('')
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    gGhostsColor.push(ghost.color)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}
console.log('gGhostsColor : ',gGhostsColor);
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === POWER_FOOD) return
    if (nextCell === PACMAN) {
        if(gIsSuper) return
        gameOver(!gIsWin)
        return
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostIdx(location){
    for(var i=0; i<gGhosts.length; i++){
        if(location.i === gGhosts[i].location.i &&
            location.j === gGhosts[i].location.j ){
            return i
        }
    }
}

function getGhostHTML(ghost) {
    var color = gIsSuper ? ghost.color = "blue" : ghost.color
    return `<span  style="color:${color}">${GHOST}</span>`
}
