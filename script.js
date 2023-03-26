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
  if(this.style.backgroundColor != "#E77471" && this.style.backgroundColor != "#85ADD9"){
    if (!turn) {
      this.style.backgroundColor = "#E77471";
    } else {
      this.style.backgroundColor = "#85ADD9";
    }
  }
}

// The function to dishighlight? the button when not hovered
function buttonOut() {

  let location = this.id.slice(-4);
  let value =  tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]];

  let color = "#FFFFFF";
  if( value == "X"){
    color = "#7295B9";
  }else if(value == "O"){
    color = "#AC5754";
  }
  this.style.backgroundColor = color;

  
}

// Da function fo wen da user does da ting where they do da clik
function clickidy() {
  // console.log("one of 'em did da clickin' on the box called " + this.id);
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

  //disableBigBoxes();
  checkIfBoxMade();
  updateRender(tixTaxMatrixValue);
}

function checkIfBoxMade() {
  // here we do the algorithm to check if BIG boi box made
}





function updateRender(matrixValue) {
  // Matches TixTaxMatrix Render to tixTaxMatrixValue

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      let miniRender =tixTaxMatrixRender[i][j];
      let miniValue = matrixValue[i][j];

      if(enabledBigBox[1] == j && enabledBigBox[0] == i){
        //tixTaxMatrixRender[i][j].backgroundColor == "#FF00FF";
        console.log(tixTaxMatrixRender[i][j]);
      }


      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {

          // Sets Whether Boxes are Disabled/Enabled
          miniRender[k][l].disabled = true;
          if(enabledBigBox[1] == j && enabledBigBox[0] == i){
            miniRender[k][l].disabled = false;
          }

          if(miniValue[k][l] == 'O'){
            miniRender[k][l].style.backgroundColor = "#E77471";
          } else if(miniValue[k][l] == 'X'){
            miniRender[k][l].style.backgroundColor = "#85ADD9";
          } else {
            miniRender[k][l].style.backgroundColor = "#FFFFFF";
          }
        }
      }

    }
  }
}