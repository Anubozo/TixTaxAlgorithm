console.log("working!");

let body = document.getElementsByTagName('body');
let bigBoard = document.createElement('table');
body[0].appendChild(bigBoard);

let board = [
    [0,0,0],
    [1,1,1],
    [2,2,2]
];
for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        board[i][j] = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

}

function createMiniBoard(x,y){
    let miniBoard;
    miniBoard = document.createElement('table');
    for(let i = 0; i < 3; i++){
        let row = document.createElement('tr');
        for (let j = 0; j < 3; j++){
            let cell = document.createElement('td');
            let button = document.createElement("button");
            cell.appendChild(button);
            row.appendChild(cell);
        }
        miniBoard.appendChild(row);
    }
    return miniBoard;
}



for(let i = 0; i < 3; i++){
    let row = document.createElement('tr');
    for (let j = 0; j < 3; j++){
        let cell = document.createElement('td');
        cell.appendChild(createMiniBoard(i,j))
        row.appendChild(cell);
    }
    bigBoard.appendChild(row);
}


console.log(board);















































