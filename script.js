const body = document.getElementById("body");
const table = document.createElement("table");
table.id = "bigBoiTable";
body.appendChild(table);
let turn = false;

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
        btn.addEventListener("click", clickAlert);
        tixTaxMatrixRender[i][j][k][l] = btn; // Dis put button in smol boi box
        smallRow.appendChild(document.createElement("td").appendChild(btn)); // Now we append smol box buttons!!!
      }
    }
  }
}

function buttonOver() {
  if (turn) {
    this.style.backgroundColor = "#E77471";
  } else {
    this.style.backgroundColor = "#85ADD9";
  }
}

function buttonOut() {
  this.style.backgroundColor = "#FFFFFF";
}

function clickAlert() {
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

  checkIfBoxMade();
}

function checkIfBoxMade() {
  // here we do the algorithm to check if smol box made
}

// console.log(tixTaxMatrixValue); // Now we log da matrix
