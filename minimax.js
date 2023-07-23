import { checkIfBoxMade } from "./script.js";

let algorithmThinking = [];

export function getAlgorithmThinking() {
    return structuredClone(algorithmThinking.reverse());
}

export function randomPicker(playableCells, tixTaxMatrixRender, currentBoard, lastPlayedMove) {
    console.table(checkPlayableMoves(currentBoard, lastPlayedMove));
    
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
// Need to write the evaluate function
export function minimax(board, depth, isAI) {
    // Checking whole game status
    let bigBoardStatus = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[0][i].length; j++) {
            bigBoardStatus[i][j] = checkIfBoxMade(board[0][i][j]);
        }
    }

    let wholeGameStatus = checkIfBoxMade(bigBoardStatus);
    
    // The break condition
    if (depth == 0 || wholeGameStatus != "") {
        return evaluate(board, isAI);
    }

    console.log("Depth: " + depth);
    console.log("Last Played Move: " + board[1]);

    // If it's the AI's turn
    if (isAI) {
        let maxEvaluation = -Infinity;
        // For all the next playable moves
        for (let i = 0; i < board[2].length; i++) {
            // Create a new board which is a copy of the old board
            let newBoard = structuredClone(board[0]);
            // Set the current next playable move as played on this copied board
            newBoard[board[2][i][0]][board[2][i][1]][board[2][i][2]][board[2][i][3]] = "B";
            // Call the minimax function with this new board, the last played move being the current next playable move, the new next playable moves, the depth as 1 less than before, and the other player's turn
            let evaluation = minimax([newBoard, board[2][i], checkPlayableMoves(newBoard, board[2][i])], depth - 1, !isAI);
            // Check to see whether this evaluation is the maximum
            maxEvaluation = Math.max(maxEvaluation, evaluation);
        }
        console.log("AI turn: max eval: " + maxEvaluation);
        algorithmThinking.push(board);
        return maxEvaluation;
    } else {
        let minEvaluation = Infinity;
        // For all the next playable moves
        for (let i = 0; i < board[2].length; i++) {
            // The next move to be played
            let nextMove = board[2][i];
            // Create a new board which is a copy of the old board
            let newBoard = structuredClone(board[0]);
            // Set the current next playable move as played on this copied board
            newBoard[nextMove[0]][nextMove[1]][nextMove[2]][nextMove[3]] = "R";
            // Call the minimax function with this new board, the last played move being the current next playable move, the new next playable moves, the depth as 1 less than before, and the other player's turn
            let evaluation = minimax([newBoard, nextMove, checkPlayableMoves(newBoard, nextMove)], depth - 1, !isAI);
            // Check to see whether this evaluation is the minimum
            minEvaluation = Math.min(minEvaluation, evaluation);
        }
        console.log("Human turn: min eval: " + minEvaluation);
        algorithmThinking.push(board);
        return minEvaluation;
    }
}

// The evaluator function
function evaluate(board, isAI) {
    let evaluation = 0;
    
    // If it's the AI's turn +1 advantage or else -1 advantage
    if (isAI) {
        evaluation += 1;
    } else {
        evaluation -= 1;
    }
    
    // const advantageCombos = [
    //     [
    //         [0, 0], [0, 1], [0, 2], // Horizontal 1
    //     ],
    //     [
    //         [1, 0], [1, 1], [1, 2], // Horizontal 2
    //     ],
    //     [
    //         [2, 0], [2, 1], [2, 2], // Horizontal 3
    //     ],
    //     [
    //         [0, 0], [1, 0], [2, 0], // Vertical 1
    //     ],
    //     [
    //         [0, 1], [1, 1], [2, 1], // Vertical 2
    //     ],
    //     [
    //         [0, 2], [1, 2], [2, 2], // Vertical 3
    //     ],
    //     [
    //         [0, 0], [1, 1], [2, 2], // Diagonal 1
    //     ],
    //     [
    //         [0, 2], [1, 1], [2, 0], // Diagonal 2
    //     ],
    // ];

    // // The number of boards where the AI has an advantage
    // let advantage = 0;

    // for (let i = 0; i < board.length; i++) {
    //     for (let j = 0; j < board[i].length; j++) {
    //         let smolBoard = board[i][j];
    //         for (let k = 0; k < advantageCombos.length; k++) {
    //             let played = [];
    //             let empty = 0;
    //             for (let l = 0; l < advantageCombos[k].length; l++) {
    //                 if (smolBoard[advantageCombos[k][l][0]][advantageCombos[k][l][1]] == "") {
    //                     empty++;
    //                 } else {
    //                     played.push(smolBoard[advantageCombos[k][l][0]][advantageCombos[k][l][1]]);
    //                 }
    //             }

    //             if (empty == 1 && played.length == 2) {
    //                 if (played[0] == played[1] && played[0] == "B") {
    //                     advantage++;
    //                 } else if (played[0] == played[1] && played[0] == "R") {
    //                     advantage--;
    //                 }
    //             }
    //         }
    //     }
    // }

    return evaluation;
}

// Dunno if it works cause idk how to test it (Just checked, it works first try, too ez)
export function checkPlayableMoves(currentBoard, lastPlayedMove) {
    let playableMoves = [];
    
    // If the big box that the player is sent to is not made, check each box within the big box
    if (checkIfBoxMade(currentBoard[lastPlayedMove[2]][lastPlayedMove[3]]) == "") {
        for (let i = 0; i < currentBoard[lastPlayedMove[2]][lastPlayedMove[3]].length; i++) {
            for (let j = 0; j < currentBoard[lastPlayedMove[2]][lastPlayedMove[3]][i].length; j++) {
                if (currentBoard[lastPlayedMove[2]][lastPlayedMove[3]][i][j] == "") {
                    playableMoves.push([lastPlayedMove[2], lastPlayedMove[3], i, j])
                }
            }
        }
    }
    // If the big box that the player is sent to is made, check every box on the board
    else {
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