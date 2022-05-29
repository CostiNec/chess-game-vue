import {moves} from "@/modules/moves";

const actionPawn = {
    color: '',
    // eslint-disable-next-line
    click: function (position, color) {

        let positionLetter = position[0];
        let positionNumber = parseInt(position[1]);

        let square = document.getElementById(position);

        let clicked = square.classList.contains('clicked');

        if (clicked) {
            moves.resetAllActionOnTables();
            return;
        }

        moves.resetAllActionOnTables();

        square.classList.add('clicked');

        if (color === 'white') {
            if (positionNumber < 4) {
                for (let positionToMove = (positionNumber + 1); positionToMove <= 4; positionToMove++) {
                    moves.toggleCanMoveOn(positionLetter + positionToMove, positionLetter + positionNumber, 'pawn', color);
                }
            } else {
                let nextPosition = positionLetter + (positionNumber + 1);
                moves.toggleCanMoveOn(nextPosition, positionLetter + positionNumber, 'pawn', color);
            }

            let diagonals = this.getDiagonals(position);

            if (diagonals["firstDiagonal"]) {
                moves.toggleCanAttackOn(diagonals["firstDiagonal"], positionLetter + positionNumber, 'pawn', color);
            }

            if (diagonals["secondDiagonal"]) {
                moves.toggleCanAttackOn(diagonals["secondDiagonal"], positionLetter + positionNumber, 'pawn', color);
            }
        } else {
            if (positionNumber > 5) {
                for (let positionToMove = (positionNumber - 1); positionToMove > 4; positionToMove--) {
                    moves.toggleCanMoveOn(positionLetter + positionToMove, positionLetter + positionNumber, 'pawn', color);
                }
            } else {
                let nextPosition = positionLetter + (positionNumber - 1);
                moves.toggleCanMoveOn(nextPosition, positionLetter + positionNumber, 'pawn', color);
            }

            let diagonals = this.getDiagonals(position, color);

            if (diagonals["firstDiagonal"]) {
                moves.toggleCanAttackOn(diagonals["firstDiagonal"], positionLetter + positionNumber, 'pawn', color);
            }

            if (diagonals["secondDiagonal"]) {
                moves.toggleCanAttackOn(diagonals["secondDiagonal"], positionLetter + positionNumber, 'pawn', color);
            }
        }
    },

    getDiagonals: function (position, color) {
        let positionLetter = position[0];
        let positionNumber = parseInt(position[1]);

        let firstDiagonal;
        let secondDiagonal;

        let firstDiagonalLetter = parseInt(positionLetter.charCodeAt(0)) + 1;
        let secondDiagonalLetter = parseInt(positionLetter.charCodeAt(0)) - 1;

        let diagonalNumber = positionNumber + 1;

        if (color === 'black') {
            diagonalNumber = positionNumber - 1;
        }

        firstDiagonal = String.fromCharCode(firstDiagonalLetter) + diagonalNumber;
        secondDiagonal = String.fromCharCode(secondDiagonalLetter) + diagonalNumber;

        if (positionLetter === 'H') {
            firstDiagonal = null;
        }

        if (positionLetter === 'A') {
            secondDiagonal = null;
        }

        let myPawn = document.getElementById(position).querySelector('.chess-piece');
        let myPawnColor = myPawn.getAttribute('data-color');

        if (firstDiagonal) {
            let square = document.getElementById(firstDiagonal);

            if (square) {
                let chessPiece = square.querySelector('.chess-piece');

                if (!chessPiece) firstDiagonal = null;
                else if (chessPiece.getAttribute('data-color') && chessPiece.getAttribute('data-color') === myPawnColor) {
                    firstDiagonal = null;
                }
            } else {
                firstDiagonal = null;
            }
        }

        if (secondDiagonal) {
            let square = document.getElementById(secondDiagonal);

            if (square) {
                let chessPiece = square.querySelector('.chess-piece');

                if (!chessPiece) secondDiagonal = null;
                else if (chessPiece.getAttribute('data-color') && chessPiece.getAttribute('data-color') === myPawnColor) {
                    secondDiagonal = null;
                }
            } else {
                secondDiagonal = null;
            }
        }

        return {
            firstDiagonal,
            secondDiagonal
        }
    },

    positionToAttack: function (position, color) {
        let diagonals = this.getDiagonals(position, color);

        let positionsToAttack = [];

        if (diagonals.firstDiagonal) positionsToAttack.push(diagonals.firstDiagonal);
        if (diagonals.secondDiagonal) positionsToAttack.push(diagonals.secondDiagonal);

        return positionsToAttack;
    },

    positionToMove: function (position, color) {
        return this.getPositions(position, color).positionsToMove;
    },
}

export {actionPawn}
