const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
let score = document.getElementById("score");
let score_inc = 0;
const Z = [[[1, 1]]];
const ROW = 10;
const COL = (COLUMN = 3);
const SQ = (squareSize = 50);
const VACANT = "WHITE"; // color of an empty square
// draw a Circle
function drawCircle(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x * SQ + 25, y * SQ + 25, 25, 0, 360, 0);
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.stroke();
}
// create the board
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}
// draw the board
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawCircle(c, r, board[r][c]);
    }
  }
}
drawBoard();
function decrement() {
  level.value = level.value - 1;
  if (level.value <= 1) {
    level.value = 1;
  }
}
function increment() {
  level.value++;
  if (level.value >= 4) {
    level.value = 4;
  }
}
// the pieces and their colors
const PIECES = [
  [Z, "red"],
  [Z, "green"],
  [Z, "yellow"],
  [Z, "purple"],
];
// generate random pieces
function randomPiece() {
  let r = (randomN = Math.floor(Math.random() * PIECES.length)); // 0 -> 6
  return new Piece(PIECES[r][0], PIECES[r][1]);
}
let pieceShift = randomPiece();
// The Object Piece
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;
  this.tetrominoN = 0; // we start from the first pattern
  this.activeTetromino = this.tetromino[this.tetrominoN];
  // we need to control the pieces
  this.x = 1;
  this.y = -1;
}
// fill function
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawCircle(this.x + c, this.y + r, color);
      }
    }
  }
};
// draw a piece to the board
Piece.prototype.draw = function () {
  this.fill(this.color);
};
// undraw a piece
Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};
// move Down the piece
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  } else {
    // we lock the piece and generate a new one
    this.lock();
    pieceShift = randomPiece();
    for (i = 9; i >= 0; i--) {
      let c = 0;
      if (
        board[i][c] === board[i][c + 1] &&
        board[i][c + 1] === board[i][c + 2] &&
        board[i][c] !== "WHITE"
      ) {
        delete board[i][c];
        delete board[i][c + 1];
        delete board[i][c + 2];
        score_inc += 10;
        score.value = score_inc;
        board.splice(i, 1);
        board.unshift([VACANT, VACANT, VACANT]);
        drawBoard();
      }
    }
  }
  i = 9;
  for (co = 0; co < COL; co++) {
    if (
      board[i][co] == board[i - 1][co] &&
      board[i - 2][co] == board[i][co] &&
      board[i][co] !== "WHITE"
    ) {
      delete board[i][co];
      delete board[i - 1][co];
      delete board[i - 2][co];
      board[i][co] = board[i - 3][co];
      board[i - 1][co] = board[i - 4][co];
      board[i - 2][co] = board[i - 5][co];
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  j = 8;
  for (co = 0; co < COL; co++) {
    if (
      board[j][co] == board[j - 1][co] &&
      board[j - 2][co] == board[j][co] &&
      board[j][co] !== "WHITE"
    ) {
      delete board[j][co];
      delete board[j - 1][co];
      delete board[j - 2][co];
      board[j][co] = board[j - 3][co];
      board[j - 1][co] = board[j - 4][co];
      board[j - 2][co] = board[j - 5][co];
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  k = 7;
  for (co = 0; co < COL; co++) {
    if (
      board[k][co] == board[k - 1][co] &&
      board[k - 2][co] == board[k][co] &&
      board[k][co] !== "WHITE"
    ) {
      delete board[k][co];
      delete board[k - 1][co];
      delete board[k - 2][co];
      board[k][co] = board[k - 3][co];
      board[k - 1][co] = board[k - 4][co];
      board[k - 2][co] = board[k - 5][co];
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  l = 6;
  for (co = 0; co < COL; co++) {
    if (
      board[l][co] == board[l - 1][co] &&
      board[l - 2][co] == board[l][co] &&
      board[l][co] !== "WHITE"
    ) {
      delete board[l][co];
      delete board[l - 1][co];
      delete board[l - 2][co];
      board[l][co] = board[l - 3][co];
      board[l - 1][co] = board[l - 4][co];
      board[l - 2][co] = board[l - 5][co];
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  m = 5;
  for (co = 0; co < COL; co++) {
    if (
      board[m][co] == board[m - 1][co] &&
      board[m - 2][co] == board[m][co] &&
      board[m][co] !== "WHITE"
    ) {
      delete board[m][co];
      delete board[m - 1][co];
      delete board[m - 2][co];
      board[m][co] = board[m - 3][co];
      board[m - 1][co] = board[m - 4][co];
      board[m - 2][co] = board[m - 5][co];
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  n = 4;
  for (co = 0; co < COL; co++) {
    if (
      board[n][co] == board[n - 1][co] &&
      board[n - 2][co] == board[n][co] &&
      board[n][co] !== "WHITE"
    ) {
      delete board[n][co];
      delete board[n - 1][co];
      delete board[n - 2][co];
      board[n][co] = board[n - 3][co];
      board[n - 1][co] = "WHITE";
      board[n - 2][co] = "WHITE";
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  o = 3;
  for (co = 0; co < COL; co++) {
    if (
      board[o][co] == board[o - 1][co] &&
      board[o - 2][co] == board[o][co] &&
      board[o][co] !== "WHITE"
    ) {
      delete board[o][co];
      delete board[o - 1][co];
      delete board[o - 2][co];
      board[o][co] = "WHITE";
      board[o - 1][co] = "WHITE";
      board[o - 2][co] = "WHITE";
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
  r = 2;
  for (co = 0; co < COL; co++) {
    if (
      board[r][co] == board[r - 1][co] &&
      board[r - 2][co] == board[r][co] &&
      board[r][co] !== "WHITE"
    ) {
      delete board[r][co];
      delete board[r - 1][co];
      delete board[r - 2][co];
      board[r][co] = "WHITE";
      board[r - 1][co] = "WHITE";
      board[r - 2][co] = "WHITE";
      score_inc += 10;
      score.value = score_inc;
      drawBoard();
    }
  }
};
// move Right the piece
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};
// move Left the piece
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};
Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we skip the vacant squares
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      // pieces to lock on top = game over
      if (this.y + r < 0) {
        alert("Game Over");
        // stop request animation frame
        gameOver = true;
        break;
      }
      // we lock the piece
      board[this.y + r][this.x + c] = this.color;
    }
  }
};
// collision fucntion
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      // if the square is empty, we skip it
      if (!piece[r][c]) {
        continue;
      }
      // coordinates of the piece after movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;
      // conditions
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }
      // skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }
      // check if there is a locked piece alrady in place
      if (board[newY][newX] != VACANT) {
        return true;
      }
    }
  }
  return false;
};
// CONTROL the piece
document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
  if (event.keyCode == 37) {
    pieceShift.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 39) {
    pieceShift.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40) {
    pieceShift.moveDown();
  }
}
// drop the piece every 1sec
let dropStart = Date.now();
let gameOver = false;
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000) {
    pieceShift.moveDown();
    dropStart = Date.now() + 1000;
    if (level.value == 2) {
      dropStart = Date.now() + 300;
    } else if (level.value == 3) {
      dropStart = Date.now() - 300;
    } else if (level.value == 4) {
      dropStart = Date.now() - 550;
    }
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}
drop();
// For suggested buttons
function leftmove() {
  pieceShift.moveLeft();
  dropStart = Date.now();
}
function rightmove() {
  pieceShift.moveRight();
  dropStart = Date.now();
}
function downmove() {
  pieceShift.moveDown();
}

// -----------------  End  Here ------------------------------ //
