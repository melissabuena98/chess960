describe("960 Chess Board", function() {
    beforeEach(function() {
        regGameID = 0;
        gameID = 1;
        board = new Chess.Board();
        spots = [0, 1, 2, 3, 4, 5, 6, 7];
        r1 = 4;
        r2 = 2;
        k = 3;
        b1 = 6;
        b2 = 7;
        k1 = 5;
        k2 = 1;
        q = 0;

        // this.board.grid[0][0] = new Chess.Pawn("white")
    });

    describe("Chess.newGame(1)", function() {
        it("should return 1 if playing Chess 960", function() {
            expect(gameID).toEqual(1);
        });
    });

    describe("Chess.newGame(0)", function() {
        it("should return 0 if playing a regular Chess game", function() {
            expect(regGameID).toEqual(0);
        });
    });

    describe("getOddEven(num) -> where num == 2", function() {
        it("should return 0 when an EVEN number (Bishop piece) is passed in", function() {
            expect(getOddEven(2)).toEqual(0);
        });
    });


    describe("getOddEven(num) -> where num == 1", function() {
        it("should return 1 when an ODD number (Bishop piece) is passed in", function() {
            expect(getOddEven(1)).toEqual(1);
        });
    });

    describe("getIndex() of a piece -> where Rook1 is 4", function() {
        it("should return 4 as the index of r1 in the spots array", function() {
            expect(getIndex(r1)).toEqual(4);
        });
    });

    describe("removeSpot()", function() {
        it("should remove a spot from the array, therefore not found", function() {
            removeSpot(3)
            expect(spots[3]).not.toEqual(3);
        });
    });

    describe("getRand() -> min = 1 and max = 10", function() {
        it("should return an integer between 1 inclusive and 10 exclusive", function() {
            var x = getRand(1,10)
            expect(x >= 1 && x < 10).toBeTruthy();
        });
    });

    describe("copyBlackPieces()", function() {
        it("black pieces coordinates should mirror that of the white pieces", function() {
            copyBlackPieces();
            expect(k_b).toEqual(k);
        });
    });
});