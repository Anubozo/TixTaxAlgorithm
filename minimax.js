export function randomPicker(playableCells, tixTaxMatrixRender) {
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