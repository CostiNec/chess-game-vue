import {moves} from "@/modules/moves";

const actionKing = {
    click: function (position, color) {
        let square = document.getElementById(position);

        let clicked = square.classList.contains('clicked');

        if (clicked) {
            moves.resetAllActionOnTables();
            return;
        }

        moves.resetAllActionOnTables();

        square.classList.add('clicked');

        let positions = this.getPositions(position, color);

        positions.positionsToMove.forEach((positionToMove) => {
            moves.toggleCanMoveOn(positionToMove, position, 'king', color);
        })

        positions.positionsToAttack.forEach((positionToAttack) => {
            moves.toggleCanAttackOn(positionToAttack, position, 'king', color);
        })
    },

    getPositions(position, color) {
        let positionsToMove = [];
        let positionsToAttack = [];

        // eslint-disable-next-line
        let square, piece, myOwnPieceThere;

        // eslint-disable-next-line
        let positionLetter = position[0];

        // eslint-disable-next-line
        let positionNumber = parseInt(position[1]);

        // eslint-disable-next-line
        let U, UR, R, DR, D, DL, L, UL;

        U = positionLetter + (positionNumber + 1);
        UR = String.fromCharCode(positionLetter.charCodeAt(0) + 1) + (positionNumber + 1);
        R = String.fromCharCode(positionLetter.charCodeAt(0) + 1) + positionNumber;
        DR = String.fromCharCode(positionLetter.charCodeAt(0) + 1) + (positionNumber - 1);
        D = positionLetter + (positionNumber - 1);
        DL = String.fromCharCode(positionLetter.charCodeAt(0) - 1) + (positionNumber - 1);
        L = String.fromCharCode(positionLetter.charCodeAt(0) - 1) + positionNumber;
        UL = String.fromCharCode(positionLetter.charCodeAt(0) - 1) + (positionNumber + 1);

        let positions = [U, UR, R, DR, D, DL, L, UL];

        positions.forEach((possiblePosition) => {
            positionLetter = possiblePosition[0]
            positionNumber = parseInt(possiblePosition[1])

            if (positionLetter.charCodeAt(0) >= 65 && positionLetter.charCodeAt(0) <= 72
                && positionNumber >= 1 && positionNumber <= 8) {
                square = document.getElementById(possiblePosition);
                myOwnPieceThere = false;

                if (square) {
                    piece = square.querySelector('.chess-piece');

                    if (piece) {
                        if (piece.getAttribute('data-color') === color) {
                            myOwnPieceThere = true;
                        }
                    }
                }

                if (!myOwnPieceThere) {
                    piece = square.querySelector('.chess-piece');

                    if (piece) {
                        positionsToAttack.push(possiblePosition);
                    } else {
                        positionsToMove.push(possiblePosition);
                    }
                }

            }
        });

        return {
            positionsToMove,
            positionsToAttack
        }
    },

    positionToAttack: function (position, color) {
        return this.getPositions(position, color).positionsToAttack;
    },

    positionToMove: function (position, color) {
        return this.getPositions(position, color).positionsToMove;
    },
}

export {actionKing}