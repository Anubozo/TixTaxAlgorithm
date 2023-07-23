let algorithmThinking = JSON.parse(localStorage["algorithmThinking"]);
let step = 0;

const body = document.getElementById("body");

const table = document.createElement("table");
table.id = "algorithmTable";
body.appendChild(table);

const infoContainer = document.createElement("div");
infoContainer.id = "infoContainer";
body.appendChild(infoContainer);

const lastPlayedMove = document.createElement("p");
lastPlayedMove.innerHTML = "Last Played Move: " + algorithmThinking[step][1]
lastPlayedMove.id = "lastPlayedMove";
infoContainer.appendChild(lastPlayedMove);

const stepsContainer = document.createElement("div");
stepsContainer.id = "stepsContainer";
body.appendChild(stepsContainer);

const nextStep = document.createElement("btn")
nextStep.innerHTML = "Next Step";
nextStep.id = "nextStep";
nextStep.className = "steps";
nextStep.addEventListener("click", nextStepFunc);
stepsContainer.appendChild(nextStep);

const prevStep = document.createElement("btn")
prevStep.innerHTML = "Previous Step";
prevStep.id = "prevStep";
prevStep.className = "steps";
prevStep.addEventListener("click", prevStepFunc);
stepsContainer.appendChild(prevStep);

const firstStep = document.createElement("btn")
firstStep.innerHTML = "First Step";
firstStep.id = "firstStep";
firstStep.className = "steps";
firstStep.addEventListener("click", firstStepFunc);
stepsContainer.appendChild(firstStep);

const lastStep = document.createElement("btn")
lastStep.innerHTML = "Last Step";
lastStep.id = "lastStep";
lastStep.className = "steps";
lastStep.addEventListener("click", lastStepFunc);
stepsContainer.appendChild(lastStep);

let tixTaxMatrixRender = [];
let tixTaxMatrixValue = [];

let blue = "#85ADD9";
let red = "#E77471";

for (let i = 0; i < 3; i++) {
    tixTaxMatrixRender.push([]);
    tixTaxMatrixValue.push([]);
    const bigRow = document.createElement("tr");
    table.appendChild(bigRow);

    for (let j = 0; j < 3; j++) {
        tixTaxMatrixRender[i].push([]);
        tixTaxMatrixValue[i].push([]);
        const bigCell = document.createElement("td");
        const miniTable = document.createElement("table");
        bigCell.className = "bigBox";
        bigCell.appendChild(miniTable);
        bigRow.appendChild(bigCell);
        
        for (let k = 0; k < 3; k++) {
            tixTaxMatrixRender[i][j].push([]);
            tixTaxMatrixValue[i][j].push([]);
            const smolRow = document.createElement("tr");
            miniTable.appendChild(smolRow);

            for (let l = 0; l < 3; l++) {
                tixTaxMatrixRender[i][j][k].push([]);
                tixTaxMatrixValue[i][j][k].push([]);
                const smolCell = document.createElement("td");
                smolRow.appendChild(smolCell);

                const btn = document.createElement("button");
                btn.id = "box" + i + j + k + l;
                btn.className = "cell";
                btn.disabled = true;
                smolCell.appendChild(btn);
                tixTaxMatrixRender[i][j][k][l].push(btn);
            }
        }
    }
}

updateBoard();

function nextStepFunc() {
    if (step != algorithmThinking.length - 1) {
        step++;
    }
    updateBoard();
}

function prevStepFunc() {
    if (step != 0) {
        step--;
    }
    updateBoard();
}

function firstStepFunc() {
    step = 0;
    updateBoard();
}

function lastStepFunc() {
    step = algorithmThinking.length - 1;
    updateBoard();
}

function updateBoard() {
    tixTaxMatrixValue = algorithmThinking[step][0];
    lastPlayedMove.innerHTML = "Last Played Move: " + algorithmThinking[step][1]
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    if (tixTaxMatrixValue[i][j][k][l] == "") {
                        document.getElementById("box" + i + j + k + l).style.backgroundColor = "#FFFFFF";
                    } else if (tixTaxMatrixValue[i][j][k][l] == "B") {
                        document.getElementById("box" + i + j + k + l).style.backgroundColor = blue;
                    } else if (tixTaxMatrixValue[i][j][k][l] == "R") {
                        document.getElementById("box" + i + j + k + l).style.backgroundColor = red;
                    }
                }
            }
        }
    }
}