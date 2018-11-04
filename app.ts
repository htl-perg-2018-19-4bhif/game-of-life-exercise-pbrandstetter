window.onload = () => {
    const boardSize = 800;
    const boardLength = 80;
    let board: number[][] = [[], []];

    // Get reference to canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    canvas.width = canvas.height = boardSize;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    //fill board with 0 for dead and 1 for alive
    for (let i = 0; i < boardLength; i++) {
        board[i] = [];
        for (let j = 0; j < boardLength; j++) {
            board[i][j] = Math.round(Math.random());
        }
    }
    // Uncomment for Gosper glider gun
    //   board[2][26] = 1, board[3][24] = 1, board[3][26] = 1, board[4][14] = 1, board[4][15] = 1, board[4][22] = 1, board[4][23] = 1, board[4][36] = 1, board[4][37] = 1, board[5][13] = 1, board[5][17] = 1, board[5][22] = 1, board[5][23] = 1, board[5][36] = 1, board[5][37] = 1, board[6][2] = 1, board[6][3] = 1, board[6][12] = 1, board[6][18] = 1, board[6][22] = 1, board[6][23] = 1, board[7][2] = 1, board[7][3] = 1, board[7][12] = 1, board[7][16] = 1, board[7][18] = 1, board[7][19] = 1, board[7][24] = 1, board[7][26] = 1, board[8][12] = 1, board[8][18] = 1, board[8][26] = 1, board[9][13] = 1, board[9][17] = 1, board[10][14] = 1, board[10][15] = 1;

    // Call 'draw' function whenever browser renders a frame on the screen
    window.requestAnimationFrame(draw);

    function draw() {
        const timer = setInterval(() => {
            drawRect();
            generateLife();
            //        window.requestAnimationFrame(draw);
        }, 250);
    }

    function generateLife() {
        let temp = duplicate(board);
        for (let i = 0; i < boardLength; i++) {
            for (let j = 0; j < boardLength; j++) {
                const neighbours = neighboursAlive(i, j);
                if (board[i][j] === 1 && (neighbours < 2 || neighbours > 3)) {
                    temp[i][j] = 0;
                } else if (board[i][j] === 0 && neighbours === 3) {
                    temp[i][j] = 1;
                }
            }
        }
        board = duplicate(temp);
    }

    function drawRect() {
        const cellSize = boardSize / boardLength;
        ctx.clearRect(0, 0, boardSize, boardSize);
        for (let i = 0; i < boardLength; i++) {
            for (let j = 0; j < boardLength; j++) {
                if (board[i][j] === 1) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    ctx.fillRect(cellSize * i, cellSize * j, cellSize, cellSize);
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                    ctx.fillRect(cellSize * i, cellSize * j, cellSize, cellSize);
                }
            }
        }
    }

    function neighboursAlive(boardI: number, boardJ: number) {
        let alive = 0;
        for (let i = boardI - 1; i <= boardI + 1; i++) {
            for (let j = boardJ - 1; j <= boardJ + 1; j++) {
                if (i >= 0 && j >= 0 && i < boardLength && j < boardLength && (boardI !== i || boardJ !== j) && board[i][j] === 1) {
                    alive++;
                }
            }
        }
        return alive;
    }

    function duplicate(ar1: number[][]) {
        let ar2: number[][] = [[], []];
        for (let i = 0; i < ar1.length; i++) {
            ar2[i] = [];
            for (let j = 0; j < ar1[i].length; j++) {
                ar2[i][j] = ar1[i][j];
            }
        }
        return ar2;
    }
};