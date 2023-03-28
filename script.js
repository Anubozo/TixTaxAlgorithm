const body = document.getElementById("body");
const table = document.createElement("table");
table.id = "bigBoiTable";
body.appendChild(table);
let turn = false; // False = Red, True = Blue
let enabledBigBox = "all";
let blue = "#85ADD9";
let red = "#E77471";

let tixTaxMatrixRender = [];
let tixTaxMatrixValue = [];


// The big boi for loop, creates 3 arrays each containing 3 arrays inside of it
for (let i = 0; i < 3; i++) {
  tixTaxMatrixRender[i] = [[], [], []];
  tixTaxMatrixValue[i] = [[], [], []];
  const bigRow = document.createElement("tr"); // The BIG boi roes
  table.appendChild(bigRow); // BIG boi roes appended on!!!
  for (let j = 0; j < 3; j++) {
    tixTaxMatrixRender[i][j] = [[], [], []];
    tixTaxMatrixValue[i][j] = [[], [], []]; 
    const bigBox = document.createElement("table");
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
      for (let l = 0; l < 3; l++) {
        const btn = document.createElement("button");
        btn.id = "box" + i + j + k + l;
        btn.addEventListener("mouseover", buttonOver);
        btn.addEventListener("mouseout", buttonOut);
        btn.addEventListener("click", clickidy);
        tixTaxMatrixRender[i][j][k][l] = btn; 
        smallRow.appendChild(document.createElement("td").appendChild(btn)); 
      }
    }
  }
}

// The function to highlight the button when hovered
function buttonOver() {
  if(this.style.backgroundColor != red && this.style.backgroundColor != blue){
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
  let value =  tixTaxMatrixValue[location[0]][location[1]][location[2]][location[3]];

  let color = "#FFFFFF";
  if( value == "B"){
    color = blue;
  }else if(value == "R"){
    color = red;
  }
  this.style.backgroundColor = color;

  
}

// Da function fo wen da user does da ting where they do da clik
function clickidy() {
  // console.log("one of 'em did da clickin' on the box called " + this.id);
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

          if(miniValue[k][l] == 'R'){
            miniRender[k][l].style.backgroundColor = red;
          } else if(miniValue[k][l] == 'B'){
            miniRender[k][l].style.backgroundColor = blue;
          } else {
            miniRender[k][l].style.backgroundColor = "#FFFFFF";
          }
        }
      }

    }
  }
}