// Logic, I require your help in figuring this one bug out
// import { getAlgorithmThinking } from "./minimax.js"

const body = document.getElementById("body");
const table = document.createElement("table");
table.id = "algorithmTable";
body.appendChild(table);
let tixTaxMatrixRender = [];
let tixTaxMatrixValue = [];

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
                btn.disabled = true;
                smolCell.appendChild(btn);
            }
        }
    }
}