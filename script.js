const body = document.getElementById("body");
const table = document.createElement("table");
table.id = "bigBoiTable";
body.appendChild(table);
let turn = false; // I used boolean for turn cause it makes thinks a hell of a lot easier
let enabledBigBox = "all";

// Matrix to be rendered
let tixTaxMatrixRender = [];
// Matrix containing the played values
let tixTaxMatrixValue = [];
// Magic tic tac toe number
const ticTacToeNumber = 3;

// The big boi for loop, creates 3 arrays each containing 3 arrays inside of it
for (let i = 0; i < ticTacToeNumber; i++) {
  // The BIG 3 roes (idk how to spell (englis iz hard man))
  tixTaxMatrixRender[i] = [[], [], []];
  tixTaxMatrixValue[i] = [[], [], []];
  const bigRow = document.createElement("tr"); // The BIG boi roes
  table.appendChild(bigRow); // BIG boi roes appended on!!!
  for (let j = 0; j < ticTacToeNumber; j++) {
    tixTaxMatrixRender[i][j] = [[], [], []]; // Now dis makes the BIG boi boxes
    tixTaxMatrixValue[i][j] = [[], [], []]; // Now dis makes the BIG boi boxes
    const bigBox = document.createElement("table");
    const bigBoxCell = document.createElement("td"); // This is the table data cell to contain this BIG boi boxes
    bigBoxCell.id = "bigBox" + i + j; // This will allow is to focus the player's moves later on
    bigBoxCell.className = "bigBox"; // This will help in the CSS
    bigBoxCell.appendChild(bigBox); // BIG boi boxes appended on!!!
    bigRow.appendChild(bigBoxCell); // BIG boi box cells appended on!!!
    for (let k = 0; k < ticTacToeNumber; k++) {
      const smallRow = document.createElement("tr"); // Now we make smol box roes
      bigBox.appendChild(smallRow); // Now we append smol box roes!!!
      tixTaxMatrixRender[i][j][k] = [[], [], []]; // Now dis makes the smol boi boxes in the smol box roes
      tixTaxMatrixValue[i][j][k] = ["", "", ""]; // Now dis makes the smol boi boxes in the smol box roes
      for (let l = 0; l < ticTacToeNumber; l++) {
        const btn = document.createElement("button"); // Dis make button (hehe butt- (I apologize)) to put in smol boi box
        btn.id = "box" + i + j + k + l;
        btn.addEventListener("mouseover", buttonOver);
        btn.addEventListener("mouseout", buttonOut);
        btn.addEventListener("click", clickidy);
        tixTaxMatrixRender[i][j][k][l] = btn; // Dis put button in smol boi box
        smallRow.appendChild(document.createElement("td").appendChild(btn)); // Now we append smol box buttons!!!
      }
    }
  }
}

// The function to highlight the button when hovered
function buttonOver() {
  if (turn) {
    this.style.backgroundColor = "#E77471";
  } else {
    this.style.backgroundColor = "#85ADD9";
  }
}

// The function to dishighlight? the button when not hovered
function buttonOut() {
  this.style.backgroundColor = "#FFFFFF";
}

// Da function fo wen da user does da ting where they do da clik
function clickidy() {
  console.log("one of 'em did da clickin' on the box called " + this.id);
  let location = this.id.slice(-4);

  if (turn) {
    this.style.backgroundColor = "#AC5754";
    tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]] = "X";
  } else {
    this.style.backgroundColor = "#7295B9";
    tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]] = "O";
  }
  this.disabled = true;
  turn = !turn;

  enabledBigBox = [location[2], location[3]];
  console.log(enabledBigBox);

  disableBigBoxes();
  checkIfBoxMade();
}

// Rn it disables the box its supposed to enable (intentionally), but I'll show you the issue over call
function disableBigBoxes() {
    for (let i = 0; i < ticTacToeNumber; i++) {
        for (let j = 0; j < ticTacToeNumber; j++) {
            if (i == enabledBigBox[0] && j == enabledBigBox[1]) {
                for (let k = 0; k < ticTacToeNumber; k++) {
                    for (let l = 0; l < ticTacToeNumber; l++) {
                        tixTaxMatrixRender[i][j][k][l].disabled = true;
                    }
                }
            }
        }
    }
}

function checkIfBoxMade() {
  // here we do the algorithm to check if BIG boi box made
}

// console.log(tixTaxMatrixValue); // Now we log da matrix
