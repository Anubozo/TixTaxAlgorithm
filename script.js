import { minimax, checkPlayableMoves, randomPicker, getAlgorithmThinking } from "./minimax.js";

const body = document.getElementById("body");
const table = document.createElement("table");
table.id = "bigBoiTable";
body.appendChild(table);
let turn = false; // False = Red, True = Blue/AI
let enabledBigBox = ["all", "all"];
let wholeGameStatus = "";
let blue = "#85ADD9";
let red = "#E77471";
let disabledBoards = [];
let tixTaxMatrixRender = [];
let tixTaxMatrixValue = [];
let playableCells = [];
let bigBoardStatus = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

localStorage.removeItem("algorithmThinking");

// The big boi for loop, creates 3 arrays each containing 3 arrays inside of it
for (let i = 0; i < 3; i++) {
  tixTaxMatrixRender[i] = [[], [], []];
  tixTaxMatrixValue[i] = [[], [], []];
  playableCells[i] = [[], [], []];
  
  const bigRow = document.createElement("tr"); // The BIG boi roes
  table.appendChild(bigRow); // BIG boi roes appended on!!!
  
  for (let j = 0; j < 3; j++) {
    tixTaxMatrixRender[i][j] = [[], [], []];
    tixTaxMatrixValue[i][j] = [[], [], []];
    playableCells[i][j] = [[], [], []];
    
    const bigBox = document.createElement("table");
    bigBox.classList = "miniTable";
    bigBox.id = "miniTable" + i + j;
    
    const bigBoxCell = document.createElement("td"); // This is the table data cell to contain this BIG boi boxes
    bigBoxCell.id = "bigBox" + i + j;
    bigBoxCell.className = "bigBox";
    bigBoxCell.appendChild(bigBox);
    bigRow.appendChild(bigBoxCell);
    
    for (let k = 0; k < 3; k++) {
      const smallRow = document.createElement("tr");
      bigBox.appendChild(smallRow);
      
      tixTaxMatrixRender[i][j][k] = [[], [], []];
      tixTaxMatrixValue[i][j][k] = ["", "", ""];
      playableCells[i][j][k] = ["", "", ""];
      
      for (let l = 0; l < 3; l++) {
        const btn = document.createElement("button");
        btn.id = "box" + i + j + k + l;
        btn.className = "cell";
        btn.addEventListener("mouseover", buttonOver);
        btn.addEventListener("mouseout", buttonOut);
        btn.addEventListener("click", clickidy);
        
        tixTaxMatrixRender[i][j][k][l] = btn;
        smallRow.appendChild(document.createElement("td").appendChild(btn));
      }
    }
  }
}

let miniTables = document.getElementsByClassName("miniTable");

// The function to highlight the button when hovered
function buttonOver() {
  if (this.style.backgroundColor != red && this.style.backgroundColor != blue) {
    if (!turn) {
      this.style.backgroundColor = red;
    } else {
      this.style.backgroundColor = blue;
    }
  }
}

// The function to dishighlight? the button when not hovered
function buttonOut() {
  let location = this.id.slice(-4);
  let value =
    tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]];

  let color = "#FFFFFF";
  if (value == "B") {
    color = blue;
  } else if (value == "R") {
    color = red;
  }
  this.style.backgroundColor = color;
}

// Da function fo wen da user does da ting where they do da clik
function clickidy() {
  console.log(
    "%c one of 'em did da clickin' on the box called " + this.id,
    "color: " + (turn ? blue : red)
  );
  let location = this.id.slice(-4);

  if (turn) {
    this.style.backgroundColor = blue;
    tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]] = "B";
  } else {
    this.style.backgroundColor = red;
    tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]] = "R";
  }
  this.disabled = true;
  turn = !turn;

  enabledBigBox = [location[2], location[3]];

  bigBoardStatus[location[0]][location[1]] = checkIfBoxMade(
    // Check if small board made
    tixTaxMatrixValue[location[0]][location[1]]
  );
  if (bigBoardStatus[location[0]][location[1]] != "") {
    console.table([
      location[0],
      location[1],
      bigBoardStatus[location[0]][location[1]],
    ]);
  }

  updateRender(tixTaxMatrixValue);

  wholeGameStatus = checkIfBoxMade(bigBoardStatus);
  if (wholeGameStatus != "") {
    console.log(wholeGameStatus); // Check if whole game ended
  }

  if (wholeGameStatus != "") {
    console.log("Game Ended!!!! Won: " + wholeGameStatus); // Check if whole game ended
    endGame();
    return 0;
  }

  // Check playable cells
  for (let i = 0; i < tixTaxMatrixRender.length; i++) {
    for (let j = 0; j < tixTaxMatrixRender[i].length; j++) {
      for (let k = 0; k < tixTaxMatrixRender[i][j].length; k++) {
        for (let l = 0; l < tixTaxMatrixRender[i][j][k].length; l++) {
          if (tixTaxMatrixRender[i][j][k][l].disabled) {
            playableCells[i][j][k][l] = "0"; // Cells that are not playable are set to 0
          } else {
            playableCells[i][j][k][l] = "1"; // Cells that are playable are set to 1
          }
        }
      }
    }
  }

  if (turn) {
    for (let i = 0; i < tixTaxMatrixRender.length; i++) {
      for (let j = 0; j < tixTaxMatrixRender[i].length; j++) {
        for (let k = 0; k < tixTaxMatrixRender[i][j].length; k++) {
          for (let l = 0; l < tixTaxMatrixRender[i][j][k].length; l++) {
            tixTaxMatrixRender[i][j][k][l].disabled = true;
          }
        }
      }
    }
    
    // Calling the random picker
    // setTimeout(() => { randomPicker(playableCells, tixTaxMatrixRender, tixTaxMatrixValue, location) }, 10);

    // Calling the minimax algorithm (I'm a literal genius)
    const movesNum = 2; // The number of moves to predict into the future
    console.log("Evaluation: " + minimax([structuredClone(tixTaxMatrixValue), location, checkPlayableMoves(structuredClone(tixTaxMatrixValue), location)], movesNum, true));
    
    // Seeing the algorithm's thinking
    let algorithmThinking = getAlgorithmThinking();
    localStorage["algorithmThinking"] = JSON.stringify(algorithmThinking);
    window.open("./futureGames.html");
  }
}

function endGame() {
  for (let i = 0; i < tixTaxMatrixRender.length; i++) {
    for (let j = 0; j < tixTaxMatrixRender[i].length; j++) {
      for (let k = 0; k < tixTaxMatrixRender[i][j].length; k++) {
        for (let l = 0; l < tixTaxMatrixRender[i][j][k].length; l++) {
          tixTaxMatrixRender[i][j][k][l].disabled = true;
          if (wholeGameStatus == "R") {
            tixTaxMatrixRender[i][j][k][l].backgroundColor = red;
          } else if (wholeGameStatus == "B") {
            tixTaxMatrixRender[i][j][k][l].backgroundColor = blue;
          } else if (wholeGameStatus == "D") {
            tixTaxMatrixRender[i][j][k][l].backgroundColor = "#A020F0";
          }
        }
      }
    }
  }
  for (let i = 0; i < miniTables.length; i++) {
    miniTables[i].backgroundColor = "#FFFFFF";
  }
}

export function checkIfBoxMade(board) {
  let boardStatus = ["D", "R", "B", ""];
  const winningCombos = [
    [
      [0, 0], [0, 1], [0, 2], // Horizontal 1
    ],
    [
      [1, 0], [1, 1], [1, 2], // Horizontal 2
    ],
    [
      [2, 0], [2, 1], [2, 2], // Horizontal 3
    ],
    [
      [0, 0], [1, 0], [2, 0], // Vertical 1
    ],
    [
      [0, 1], [1, 1], [2, 1], // Vertical 2
    ],
    [
      [0, 2], [1, 2], [2, 2], // Vertical 3
    ],
    [
      [0, 0], [1, 1], [2, 2], // Diagonal 1
    ],
    [
      [0, 2], [1, 1], [2, 0], // Diagonal 2
    ],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    const [a, b, c] = combo;

    if (
      board[a[0]][a[1]] == board[b[0]][b[1]] &&
      board[b[0]][b[1]] == board[c[0]][c[1]]
    ) {
      if (board[a[0]][a[1]] == "R") {
        return boardStatus[1];
      } else if (board[a[0]][a[1]] == "B") {
        return boardStatus[2];
      }
    }
  }

  let playedBoxNum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] != "") {
        playedBoxNum++;
      }
    }
  }
  if (playedBoxNum == 9) {
    return boardStatus[0];
  }

  return boardStatus[3];
}

// Matches TixTaxMatrix Render to tixTaxMatrixValue
function updateRender(matrixValue) {

  disabledBoards = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let miniRender = tixTaxMatrixRender[i][j];
      let miniValue = matrixValue[i][j];
      if (enabledBigBox[1] == j && enabledBigBox[0] == i) {
        console.log(tixTaxMatrixRender[i][j]);
      } else {
        disabledBoards.push(3 * i + j);
      }

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          // Sets Whether Boxes are Disabled/Enabled
          miniRender[k][l].disabled = true;
          if (
            enabledBigBox[0] == i &&
            enabledBigBox[1] == j &&
            tixTaxMatrixValue[i][j][k][l] == "" &&
            bigBoardStatus[i][j] == ""
          ) {
            miniRender[k][l].disabled = false;
          }
          if (miniValue[k][l] == "R") {
            miniRender[k][l].style.backgroundColor = red;
          } else if (miniValue[k][l] == "B") {
            miniRender[k][l].style.backgroundColor = blue;
          } else {
            miniRender[k][l].style.backgroundColor = "#FFFFFF";
          }
        }
      }
    }
  }
  // Any board rule
  if (bigBoardStatus[enabledBigBox[0]][enabledBigBox[1]] != "") {
    disabledBoards = [];
    console.log(bigBoardStatus);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let miniRender = tixTaxMatrixRender[i][j];

        if (bigBoardStatus[i][j] !== '') {
          disabledBoards.push(3 * i + j);
        }

        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            miniRender[k][l].disabled = true;

            if (
              tixTaxMatrixValue[i][j][k][l] === '' &&
              bigBoardStatus[i][j] === ''
            ) {

              miniRender[k][l].disabled = false;
            }
          }
        }
      }
    }
  }
  colorBoards();
}

// Colors Backgrounds of Enabled Boards
function colorBoards() {
  for (let i = 0; i < miniTables.length; i++) {
    if (disabledBoards.includes(i)) {
      miniTables[i].style = "background-color: #FFFFFF";
    } else {
      if (!turn) {
        miniTables[i].style = "background-color: rgba(231,116,113,0.4)"; // Red
      } else {
        miniTables[i].style = "background-color: rgba(133,173,217,0.4)"; // Blue
      }
    }
  }
}

