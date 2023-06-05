import { checkIfBoxMade } from "./script.js";

export function randomPicker(playableCells, tixTaxMatrixRender, ...currentBoard) {
    console.log("picking random");
    let i;
    let j;
    let k;
    let l;
    do {
        i = Math.floor(Math.random() * 3);
        j = Math.floor(Math.random() * 3);
        k = Math.floor(Math.random() * 3);
        l = Math.floor(Math.random() * 3);
    } while (playableCells[i][j][k][l] == "0");

    console.log("picked box" + i + j + k + l);

    tixTaxMatrixRender[i][j][k][l].disabled = false;
    tixTaxMatrixRender[i][j][k][l].click();
}

// Blue = AI = True = Maximizer
// board = [currentBoard, lastPlayedMove, nextPlayableMoves]
// need to define newBoard and need to write the evaluate function
export function minimax(board, depth, isAI) {
    if (depth == 0 || wholeGameStatus != "") {
        return evaluate(board);
    }

    if (isAI) {
        let maxEvaluation = -Infinity;
        for (let i = 0; i < board[2]; i++) {
            newBoard = [];
            let evaluation = minimax([newBoard, board[2][i], ], depth - 1, !isAI);
            maxEvaluation = Math.max(maxEvaluation, evaluation);
        }
        return maxEvaluation;
    } else {
        let minEvaluation = Infinity;
        for (let i = 0; i < board[2]; i++) {
            let evaluation = minimax(newBoard, depth - 1, !isAI);
            minEvaluation = Math.min(minEvaluation, evaluation);
        }
        return minEvaluation;
    }

}

function evaluate(board) {
    return 0;
}

// Dunno if it works cause idk if works
function checkPlayableMoves(currentBoard, lastPlayedMove) {
    let playableMoves = [];
    if (checkIfBoxMade(currentBoard[lastPlayedMove[2]][lastPlayedMove[3]]) == "") {
        for (let i = 0; i < currentBoard[lastPlayedMove[2]][lastPlayedMove[3]].length; i++) {
            for (let j = 0; j < currentBoard[lastPlayedMove[2]][lastPlayedMove[3]][i].length; j++) {
                if (currentBoard[lastPlayedMove[2]][lastPlayedMove[3]][i][j] == "") {
                    playableMoves.push([lastPlayedMove[2], lastPlayedMove[3], i, j])
                }
            }
        }
    } else {
        for (let i = 0; i < currentBoard.length; i++) {
            for (let j = 0; j < currentBoard[i].length; j++) {
                for (let k = 0; k < currentBoard[i][j].length; k++) {
                    for (let l = 0; l < currentBoard[i][j][k].length; l++) {
                        if (currentBoard[i][j][k][l] == "") {
                            playableMoves.push([i, j, k, l])
                        }
                    }
                }
            }
        }
    }
    
    return playableMoves;
}