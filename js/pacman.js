'use strict'

//Change to 1 function ( Game over + Victory game)

const PACMAN = '😷';
var gPacman;
var gDeadGhosts = []
var gIsSuper

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)
    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        gCountFood++
        if (gFoodOnBoard - 1 === gCountFood) {
            gameOver(gIsWin)
            console.log('gIsWin : ',gIsWin);
        }
    } else if (nextCell === POWER_FOOD) {
        if (gIsSuper) return

        superMode()
        setTimeout(() => {

        })
        gIsSuper = true
        setTimeout(() => {
            gIsSuper = false
        }, 3000)

    } else if (nextCell === CHERRY) {
        if (gIsSuper) return
        updateScore(10)
    } else if (nextCell === GHOST) {

        if (gIsSuper) {
            var idx = getGhostIdx(nextLocation)
            var deadGhost = gGhosts.splice(idx, 1)[0]
            gDeadGhosts.push(deadGhost)
            if (deadGhost.currCellContent === FOOD) {
                gFoodOnBoard--
                gCountFood++
                deadGhost.currCellContent = EMPTY
            }

            setTimeout(() => {
                gIsSuper = false
                reviveGhosts() // Finish this 

            }, 3000)

            //     setTimeout(() => {
            //         gGhosts.push(...gDeadGhosts[0])
            //         gIsSuper = false
            //         getGhostHTML(deadGhost)
            //     }, 1000)

            //Model
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
            renderCell(gPacman.location, EMPTY)
            //DOM
            gPacman.location = nextLocation
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
            renderCell(gPacman.location, PACMAN)

        } else {
            gameOver(!gIsWin)
            renderCell(gPacman.location, '🪦')
        }
        return
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function superMode() {
    gIsSuper = true
}


//Finish This

// function reviveGhosts() {
//     for (var i = 0; i < gDeadGhosts.length; i++) {
//         var ghost = gDeadGhosts[i]
//         resetGhostColor(ghost)
//         gGhosts.push(ghost)
//     }
//     gDeadGhosts = []
// }

// function resetGhostColor(ghost) {
//     for(var i=0; i<gDeadGhosts.length;i++) {
//         ghost.color = ghost.color[i]
//         }
// }



function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}