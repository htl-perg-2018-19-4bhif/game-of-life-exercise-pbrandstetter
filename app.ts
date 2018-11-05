window.onload = () => {
    const gliderGun: boolean = true;
    const boardSize = 800;
    const boardLength = 200;
    const percent = 3;
    let board: number[][] = [[], []];
    const temp = [];

    // Get reference to canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    canvas.width = canvas.height = boardSize;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    //fill board with 0 for dead and 1 for alive
    for (let i = 0; i < boardLength; i++) {
        board[i] = [];
        for (let j = 0; j < boardLength; j++) {
            board[i][j] = 0;
        }
    }

    if (!gliderGun) {
        for (let i = 0; i < boardLength * boardLength / 100 * percent; i++) {
            board[Math.floor(Math.random() * boardLength)][Math.floor(Math.random() * boardLength)] = 1;
        }
    } else {
        board[26][2] = 1, board[24][3] = 1, board[26][3] = 1, board[14][4] = 1, board[15][4] = 1, board[22][4] = 1, board[23][4] = 1, board[36][4] = 1, board[37][4] = 1, board[13][5] = 1, board[17][5] = 1, board[22][5] = 1, board[23][5] = 1, board[36][5] = 1, board[37][5] = 1, board[2][6] = 1, board[3][6] = 1, board[12][6] = 1, board[18][6] = 1, board[22][6] = 1, board[23][6] = 1, board[2][7] = 1, board[3][7] = 1, board[12][7] = 1, board[16][7] = 1, board[18][7] = 1, board[19][7] = 1, board[24][7] = 1, board[26][7] = 1, board[12][8] = 1, board[18][8] = 1, board[26][8] = 1, board[13][9] = 1, board[17][9] = 1, board[14][10] = 1, board[15][10] = 1;
    }
    for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
            temp.push({ x: i, y: j, change: board[i][j] });
        }
    }

    // Call 'draw' function whenever browser renders a frame on the screen
    window.requestAnimationFrame(draw);

    function draw() {
        drawRect();
        temp.splice(0, temp.length);
        generateLife();
        window.requestAnimationFrame(draw);
    }

    function generateLife() {
        for (let i = 0; i < boardLength; i++) {
            for (let j = 0; j < boardLength; j++) {
                const neighbours = neighboursAlive(i, j);
                if (board[i][j] === 1 && (neighbours < 2 || neighbours > 3)) {
                    temp.push({ x: i, y: j, change: 0 });
                } else if (board[i][j] === 0 && neighbours === 3) {
                    temp.push({ x: i, y: j, change: 1 });
                }
            }
        }
        for (let i = 0; i < temp.length; i++) {
            board[temp[i].x][temp[i].y] = temp[i].change;
        }
    }

    function drawRect() {
        const cellSize = Math.round(boardSize / boardLength);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].change === 1) {
                ctx.fillRect(cellSize * temp[i].x, cellSize * temp[i].y, cellSize, cellSize);
            } else {
                ctx.clearRect(cellSize * temp[i].x, cellSize * temp[i].y, cellSize, cellSize);
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
};