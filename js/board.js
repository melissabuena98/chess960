var spots = [0, 1, 2, 3, 4, 5, 6, 7];

//WHITE PIECES
var r1;
var r2;
var k;
var b1;
var b2;
var k1;
var k2;
var q;

//BLACK PIECES
var r1_b;
var r2_b;
var k_b;
var b1_b;
var b2_b;
var k1_b;
var k2_b;
var q_b;

//////////////////
Chess.Board = function (grid) {
  this.king = 0;
  console.log("INSIDE CHESS.BOARD");
  if (typeof grid !== "undefined") {
    this.grid = grid;
  } else {
    console.log("G", Chess.gameID)
    this.init(Chess.gameID);
  }
  this.moves = [];
};

Chess.Board.prototype.init = function (gameID) {
  this.randomPiece();
  this.grid = [];
  if(gameID == 1){
    createRandomPlacement();
  }
  for (var i = 0; i < 8; i++) {
    this.grid.push([]);
    if(gameID == 0){
      for (var j = 0; j < 8; j++) {
        this.grid[i][j] = this.regularPiece(i, j);
      }
    }
    else if(gameID == 1){
      for (var j = 0; j < 8; j++) {
        this.grid[i][j] = this.randomPiece(i, j);
      }
    }
  }
  this.returnKing();
};

Chess.Board.prototype.move = function (startPos, endPos) {
  var
    piece1 = this.grid[startPos[0]][startPos[1]],
    piece2 = this.grid[endPos[0]][endPos[1]];

  if (piece1.validMove(startPos, endPos)) {
    this.movePiece(piece1, piece2, startPos, endPos);
    this.didKingCastle(piece1, startPos);
    return true;
  }
  return false;
};

Chess.Board.prototype.movePiece = function (piece1, piece2, startPos, endPos) {
  this.grid[startPos[0]][startPos[1]] = null;
  this.grid[endPos[0]][endPos[1]] = piece1;
  piece1.currentPosition = endPos;
  piece1.moved++;
  this.moves.push([startPos, endPos, piece1, piece2]);
};

Chess.Board.prototype.didKingCastle = function (piece, lastPos) {
  if (piece instanceof Chess.King && piece.didCastle(lastPos)) {
    this.findRook(piece, lastPos);
  }
};

Chess.Board.prototype.findRook = function (king) {
  if (king.color === "white") {
    if (Chess.Util._arrayEquals(king.currentPosition, [7, 6])) {
      this.moveRook([7, 7], [7, 5]);
    } else if (Chess.Util._arrayEquals(king.currentPosition, [7, 2])) {
      this.moveRook([7, 0], [7, 3]);
    }
  } else if (king.color === "black") {
    if (Chess.Util._arrayEquals(king.currentPosition, [0, 6])) {
      this.moveRook([0, 7], [0, 5]);
    } else if (Chess.Util._arrayEquals(king.currentPosition, [0, 2])) {
      this.moveRook([0, 0], [0, 3]);
    }
  }
};

Chess.Board.prototype.moveRook = function (startPos, endPos) {
  var rook = this.getPiece(startPos);

  this.movePiece(rook, null, startPos, endPos);
};

Chess.Board.prototype.reverseLastMove = function () {
  var
    lastMove = this.moves[this.moves.length - 1],
    startPos = lastMove[0],
    endPos = lastMove[1],
    piece1 = lastMove[2],
    piece2 = lastMove[3];
  piece1.moved--;

  this.grid[startPos[0]][startPos[1]] = piece1;
  piece1.currentPosition = startPos;

  this.grid[endPos[0]][endPos[1]] = piece2;
  if (piece2 !== null) piece2.currentPosition = endPos;

  this.moves.pop();
};

Chess.Board.prototype.getPiece = function (array) {
  return this.grid[array[0]][array[1]];
};

///////////////////////////////



// Chess.Board.prototype.placePiece = function(i, j, gameID) {
//   if(gameID == 0){
//     console.log("REG");
//     this.regularPiece(i,j);
//   }
//   else if(gameID == 1){
//     console.log("960");
//   }
// };

Chess.Board.prototype.regularPiece = function (i, j) {
  var position = [i, j];
  if (i === 1) {
    return new Chess.Pawn("black", this, position);
  } else if (i === 6) {
    return new Chess.Pawn("white", this, position);
  } else if (i === 0 && (j === 7 || j === 0)) {
    return new Chess.Rook("black", this, position);
  } else if (i === 0 && (j === 6 || j === 1)) {
    return new Chess.Knight("black", this, position);
  } else if (i === 0 && (j === 5 || j === 2)) {
    return new Chess.Bishop("black", this, position);
  } else if (i === 0 && j === 4) {
    return new Chess.King("black", this, position);
  } else if (i === 0 && j === 3) {
    return new Chess.Queen("black", this, position);
  } else if (i === 7 && (j === 7 || j === 0)) {
    return new Chess.Rook("white", this, position);
  } else if (i === 7 && (j === 6 || j === 1)) {
    return new Chess.Knight("white", this, position);
  } else if (i === 7 && (j === 5 || j === 2)) {
    return new Chess.Bishop("white", this, position);
  } else if (i === 7 && j === 4) {
    return new Chess.King("white", this, position);
  } else if (i === 7 && j === 3) {
    return new Chess.Queen("white", this, position);
  } else {
    return null;
  }
}

Chess.Board.prototype.randomPiece = function (i, j) {
  console.log("Inside random piece")
  var position = [i, j];
  if (i === 1) {
    return new Chess.Pawn("black", this, position);
  } 
  else if (i === 6) {
    return new Chess.Pawn("white", this, position);
    console.log("PAWN PLACED");
  }
  else if (i === 0 && (j === r1_b || j === r2_b)){
    return new Chess.Rook("black", this, position);
  }
  else if(i === 0 && (j === k1_b || j === k2_b)){
    return new Chess.Knight("black", this, position);
  }
  else if(i === 0 && (j === b1_b || j === b2_b)){
    return new Chess.Bishop("black", this, position);
  }
  else if(i === 0 && j === k_b){
    return new Chess.King("black", this, position);
  }
  else if(i === 0 && j === q_b){
    return new Chess.Queen("black", this, position);
  }
  else if (i === 7 && (j === r1 || j === r2)){
    return new Chess.Rook("white", this, position);
  }
  else if(i === 7 && (j === k1 || j === k2)){
    return new Chess.Knight("white", this, position);
  }
  else if(i === 7 && (j === b1 || j === b2)){
    return new Chess.Bishop("white", this, position);
  }
  else if(i === 7 && j === k){
    return new Chess.King("white", this, position);
  }
  else if(i === 7 && j === q){
    return new Chess.Queen("white", this, position);
  }
  else {
    return null;
  }
};

function createRandomPlacement(){
  placeRooks();
  placeKing();
  placeBishops();
  placeRemaining();
  copyBlackPieces();
  console.log(spots);
}

Chess.Board.prototype.returnKing = function(){
  this.king = k;
  console.log("THIS", this.king);
}

function placeRooks() {
  r1 = getRand(0, spots.length);
  console.log("ROOK1", r1);
  removeSpot(getIndex(r1));
  var isNotValidRook = true;

  while (isNotValidRook) {
    // console.log("IN WHILE");
    r2 = spots[getRand(0, spots.length)]
    if (r1 + 1 == r2 || r1 - 1 == r2) {
      isNotValidRook == true;
      // console.log("no")
    }
    else if (r1 + 2 >= r2 || r1 - 2 <= r2) {
      isNotValidRook == false;
      // console.log("ok");
      break;
    }
  }
  console.log("ROOK2", r2);
  removeSpot(getIndex(r2));
}

function placeKing() {
  console.log("INSIDE KING")
  var isTaken = true;
  while (isTaken) {
    if (r1 < r2) {
      k = getRand(r1, r2);
      // console.log("NOR", k)
    }
    else {
      k = getRand(r2, r1);
      // console.log("OP", k)
    }
    if (!spots.includes(k)) {
      isTaken = true;
      // console.log('ok');
    }
    else if (spots.includes(k)) {
      isTaken = false;
      break;
    }
  }
  console.log("KING", k);
  this.king = k;
  removeSpot(getIndex(k));
}

function placeBishops(){
  var opposites = [];
  b1 = spots[getRand(0, spots.length)];
  console.log("BISHOP1", b1);
  removeSpot(getIndex(b1));
  b1Type = getOddEven(b1);
  // console.log('B1TYPE', b1Type);
  if(b1Type == 0){
    // console.log("EVEN")
    for(i=0; i<spots.length; i++){
      if(getOddEven(i) == 1){
        opposites.push(spots[i]);
      }
    }
  }
  else{
    // console.log("ODD");
    for(i=0; i<spots.length; i++){
      if(getOddEven(i) == 0){
        opposites.push(spots[i]);
      }
    }
  }

  b2 = opposites[getRand(0, opposites.length)];
  removeSpot(getIndex(b2));
  console.log("BISHOP2", b2);
}

function placeRemaining(){
  k1 = spots[getRand(0, spots.length)];
  removeSpot(getIndex(k1));
  console.log("KNIGHT1", k1);

  k2 = spots[getRand(0, spots.length)];
  removeSpot(getIndex(k2));
  console.log("KNIGHT2", k2);

  q = spots[0];
  console.log("QUEEN", q);
}

function copyBlackPieces(){
  r1_b = r1;
  r2_b = r2;
  k_b = k;
  b1_b = b1;
  b2_b = b2;
  k1_b = k1;
  k2_b = k2;
  q_b = q;

  // console.log("BLK R1", r1_b);
  // console.log("BLK R2", r2_b);
  // console.log("BLK K", k_b);
  // console.log("BLK B1", b1_b);
  // console.log("BLK B2", b2_b);
  // console.log("BLK K1", k1_b);
  // console.log("BLK K2", k2_b);
  // console.log("BLK Q", q_b);
  
}

//Return 0 if even | Return 1 if odd
function getOddEven(num){
  return num % 2;
}

function getIndex(num) {
  var index = spots.indexOf(num);
  return index;
}

function removeSpot(index) {
  spots.splice(index, 1);
  // console.log(spots);
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * RULES: 
 * 1. Bishops must be placed on opposite-color squares
 * 2. The king must be placed on a square between the rooks
 * 
 * Randomly place both rooks down between where i = 7 and j is between 0 and 7
 * 
 * Depending on what the j is for rook use this as bounds to place King
 * Randomly place king between the j index of the rooks
 * 
 * Create squares array of coordinates, all valid spots, remove as they get taken
 * Create Black and White Spots array coordinates and 
 * When a spot gets taken, it is removed from valid squares array and removed from the black or white
 * 
 * Randomize if 1st bishop will be on white or black spot
 * Randomly pick spot from the black or white array and add to is taken and remove from
 * 
 * for each remaining spot, asssign both knights and the queen
 */

